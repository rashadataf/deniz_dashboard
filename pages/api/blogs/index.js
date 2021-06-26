import { connectToDatabase } from "../../../util/mongodb";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  return await fn(req, res);
};

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const {
        query: { category },
      } = req;
      const query = {};
      const { client, db } = await connectToDatabase();
      if (category && category.length > 0) {
        query.categories = { $in: [category] };
      }
      const blogs = await db.collection("blogs").find(query).toArray();
      // const result = await blogs.toArray();
      // for (let i = 0; i < result.length; i++) {
      //   const category = result[i].category;
      //   const returnedCategory = await db
      //     .collection("categories")
      //     .findOne({ _id: category });
      //   result[i].category = returnedCategory;
      // }
      res.status(200).send(blogs);
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  }
}

export default allowCors(handler);
