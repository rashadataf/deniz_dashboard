import { getSession } from "next-auth/client";
import mongodb from "mongodb";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req, res) {
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
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      {
        const { client, db } = await connectToDatabase();
        const areas = await db
          .collection("areas")
          .find({ state: id })
          .toArray();
        res.status(200).send(areas);
      }
      break;
    case "PUT":
      {
        const updates = Object.keys(req.body);
        const allowedUpdates = ["title", "arTitle", "country"];
        const isValidOperation = updates.every((update) =>
          allowedUpdates.includes(update)
        );
        if (!isValidOperation) {
          res.status(404).send({ error: "an Invalid Update" });
        }
        try {
          const { client, db } = await connectToDatabase();
          const result = await db.collection("states").updateOne(
            { _id: new mongodb.ObjectID(id) },
            {
              $set: {
                title: req.body.title,
                arTitle: req.body.arTitle,
                country: req.body.country,
              },
            }
          );
          res.status(200).json({ success: "updated!" });
        } catch (error) {
          res.status(400).send(error);
        }
      }
      break;
    case "DELETE":
      {
        try {
          const { client, db } = await connectToDatabase();
          const deleteResult = await db
            .collection("states")
            .deleteOne({ _id: new mongodb.ObjectID(id) });
          res.status(200).json({ success: "deleted!" });
        } catch (error) {}
      }
      break;
  }
}
