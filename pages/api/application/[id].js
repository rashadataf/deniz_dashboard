const mongodb = require("mongodb");
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
        query: { id },
      } = req;
      const { client, db } = await connectToDatabase();

      const application = await db
        .collection("applications")
        .findOne({ _id: new mongodb.ObjectID(id) });
      if (application) {
        const statusId = application.status;
        if (statusId && statusId.length > 0) {
          const status = await db
            .collection("statuses")
            .findOne({ _id: new mongodb.ObjectID(statusId) });
          if (status) {
            delete status._id;
            return res.status(200).send(status);
          } else
            return res
              .status(200)
              .send({
                message:
                  "There is a problem in the status for this application",
              });
        } else
          return res
            .status(200)
            .send({ message: "There is no status for this application" });
      } else {
        return res.status(404).send({ message: "application was not found!" });
      }
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  }
}

export default allowCors(handler);
