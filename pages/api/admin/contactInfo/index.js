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
      const contactInfo = db.collection("contactInfo");
      const oldContactInfo = await contactInfo.find({}).toArray();
      res.status(200).send(oldContactInfo);
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  } else if (req.method === "POST" || req.method === "post") {
    try {
      const email = req.body.email;
      const phone = req.body.phone;
      const fax = req.body.fax;
      const whatsapp = req.body.whatsapp;
      const facebook = req.body.facebook;
      const twitter = req.body.twitter;
      const youtube = req.body.youtube;
      const linkedin = req.body.linkedin;
      const { client, db } = await connectToDatabase();
      const contactInfo = db.collection("contactInfo");
      const oldContactInfo = await contactInfo.find({}).toArray();
      if (oldContactInfo.length > 0) {
        const updatedContactInfo = oldContactInfo[0];
        const result = await contactInfo.updateOne(
          { _id: new mongodb.ObjectID(updatedContactInfo._id) },
          {
            $set: {
              email,
              phone,
              fax,
              whatsapp,
              facebook,
              twitter,
              youtube,
              linkedin,
            },
          }
        );
        return res.send(true);
      } else {
        const result = await contactInfo.insertOne({
          email,
          phone,
          fax,
          whatsapp,
          facebook,
          twitter,
          youtube,
          linkedin,
        });
        return res.send(true);
      }
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  }
}
