import mongodb from "mongodb";
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
      const countries = await db.collection("countries").find({}).toArray();
      const colleges = await db.collection("colleges").find({}).toArray();
      const ScientificDegrees = await db
        .collection("ScientificDegrees")
        .find({})
        .toArray();
      const languages = await db.collection("languages").find({}).toArray();
      const programs = await db.collection("programs").find({}).toArray();
      const specializations = await db
        .collection("specializations")
        .find({})
        .toArray();
      res
        .status(200)
        .send({
          countries,
          colleges,
          ScientificDegrees,
          languages,
          programs,
          specializations,
        });
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  }
}

export default allowCors(handler);
