import { connectToDatabase } from "../../../util/mongodb";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  return await fn(req, res);
};

async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).send(true);
  } else {
    if (req.method === "POST") {
      try {
        const { client, db } = await connectToDatabase();
        const {
          name,
          fatherName,
          motherName,
          sex,
          birthDate,
          nationality,
          residenceCountry,
          email,
          phone,
          hearedAboutUs,
          scientificDegree,
          university,
          otherUniversities,
          specialization,
          otherSpecializations,
          language,
          description,
        } = req.body;
        const newApplication = {};
        if (name && name.length > 0) newApplication.name = name;
        else throw new Error("an invalid name!");
        if (fatherName && fatherName.length > 0)
          newApplication.fatherName = fatherName;
        else throw new Error("an invalid father name!");
        if (motherName && motherName.length > 0)
          newApplication.motherName = motherName;
        else throw new Error("an invalid mother name!");
        if (sex && sex.length > 0) newApplication.sex = sex;
        else throw new Error("an invalid sex!");
        if (birthDate && birthDate.length > 0)
          newApplication.birthDate = birthDate;
        if (nationality && nationality.length > 0)
          newApplication.nationality = nationality;
        else throw new Error("an invalid nationality!");
        if (residenceCountry && residenceCountry.length > 0)
          newApplication.residenceCountry = residenceCountry;
        else throw new Error("an invalid residence country!");
        if (email && email.length > 0) {
          let emailFilter =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          let isEmail = emailFilter.test(email);
          if (!isEmail) {
            throw new Error("an invalid email!");
          } else newApplication.email = email;
        }
        if (phone && phone.length > 0) newApplication.phone = phone;
        else throw new Error("an invalid phone!");

        if (hearedAboutUs && hearedAboutUs.length > 0)
          newApplication.hearedAboutUs = hearedAboutUs;
        else newApplication.hearedAboutUs = "";
        if (scientificDegree && scientificDegree.length > 0)
          newApplication.scientificDegree = scientificDegree;
        else throw new Error("an invalid scientific degree!");
        if (university && university.length > 0)
          newApplication.university = university;
        if (otherUniversities && JSON.parse(otherUniversities).length > 0)
          newApplication.otherUniversities = JSON.parse(otherUniversities);
        else newApplication.otherUniversities = [];
        if (specialization && specialization.length > 0)
          newApplication.specialization = specialization;
        else throw new Error("an invalid specialization!");
        if (otherSpecializations && JSON.parse(otherSpecializations).length > 0)
          newApplication.otherSpecializations =
            JSON.parse(otherSpecializations);
        else newApplication.otherSpecializations = [];
        if (language && language.length > 0) newApplication.language = language;
        else newApplication.language = "";
        if (description && description.length > 0)
          newApplication.description = description;
        else newApplication.description = "";
        newApplication.status = "";
        const application = await db
          .collection("applications")
          .insertOne(newApplication);

        var nodemailer = require("nodemailer");

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "rashadtest993@gmail.com",
            pass: "Rashadtest1993#",
          },
        });

        var mailOptions = {
          from: "rashadtest993@gmail.com",
          to: `${email}`,
          subject: "Success",
          text: `Your application was recived and your ID is: ${application.insertedId}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res.send(application.insertedId);
      } catch (error) {
        res.status(400).send({ error: "there was an error happened!" + error });
      }
    }
  }
}

export default allowCors(handler);
