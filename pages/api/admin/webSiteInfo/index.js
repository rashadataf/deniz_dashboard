import mongodb from "mongodb";
import { getSession } from "next-auth/client";
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
  if (req.method === "GET" || req.method === "get") {
    try {
      const { client, db } = await connectToDatabase();
      const webSiteInfo = db.collection("webSiteInfo");
      const oldWebSiteInfo = await webSiteInfo.find({}).toArray();
      res.status(200).send(oldWebSiteInfo);
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  } else if (req.method === "POST" || req.method === "post") {
    try {
      const vision = req.body.vision;
      const location = req.body.location;
      const { client, db } = await connectToDatabase();
      const webSiteInfo = db.collection("webSiteInfo");
      const oldWebSiteInfo = await webSiteInfo.find({}).toArray();
      if (oldWebSiteInfo.length > 0) {
        const updatedWebSiteInfo = oldWebSiteInfo[0];
        const result = await webSiteInfo.updateOne(
          { _id: new mongodb.ObjectID(updatedWebSiteInfo._id) },
          {
            $set: {
              vision,
              location,
            },
          }
        );
        return res.send(true);
      } else {
        const result = await webSiteInfo.insertOne({
          vision,
          location,
        });
        return res.send(true);
      }
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  }
}
