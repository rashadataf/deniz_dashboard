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
      const { client, db } = await connectToDatabase();
      const services = await db.collection("services").find({}).toArray();
      res.status(200).send(services);
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  }
}

export default allowCors(handler);
