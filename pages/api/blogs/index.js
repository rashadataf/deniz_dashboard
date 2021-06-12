import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  return await fn(req, res);
};

async function handler(req, res) {
  const session = await getSession({ req: req });
  if (!session) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  const adminEmail = session.user.email;
  const { client, db } = await connectToDatabase();
  const admins = db.collection("admins");
  const admin = await admins.findOne({ email: adminEmail });
  if (!admin) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  if (admin.role !== "admin") {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  if (req.method === "GET") {
    try {
      const { client, db } = await connectToDatabase();
      const blogs = await db.collection("blogs").find({});
      const result = await blogs.toArray();
      for (let i = 0; i < result.length; i++) {
        const category = result[i].category;
        const returnedCategory = await db
          .collection("categories")
          .findOne({ _id: category });
        result[i].category = returnedCategory;
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  }
}

export default allowCors(handler);