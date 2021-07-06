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
      const siteInfo = {};
      const webSiteInfo = await db.collection("webSiteInfo").find({}).toArray();

      const contactInfo = await db.collection("contactInfo").find({}).toArray();

      if (webSiteInfo && webSiteInfo.length > 0) {
        siteInfo.vision = webSiteInfo[0].vision;
        siteInfo.location = webSiteInfo[0].location;
      }

      if (contactInfo && contactInfo.length > 0) {
        siteInfo.email = contactInfo[0].email;
        siteInfo.phone = contactInfo[0].phone;
        siteInfo.fax = contactInfo[0].fax;
        siteInfo.whatsapp = contactInfo[0].whatsapp;
        siteInfo.facebook = contactInfo[0].facebook;
        siteInfo.twitter = contactInfo[0].twitter;
        siteInfo.youtube = contactInfo[0].youtube;
        siteInfo.linkedin = contactInfo[0].linkedin;
      }

      res.status(200).send(siteInfo);
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" + error });
    }
  }
}

export default allowCors(handler);
