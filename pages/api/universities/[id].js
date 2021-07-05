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
      const {
        query: { id },
      } = req;
      const { client, db } = await connectToDatabase();

      const university = await db
        .collection("universities")
        .findOne({ _id: new mongodb.ObjectID(id) });
      if (university) {
        let universityState;
        let universityArea;
        let universityCountry;
        if (university.state && university.state.length > 0)
          universityState = await db
            .collection("states")
            .findOne({ _id: new mongodb.ObjectID(university.state) });
        if (university.area && university.area.length > 0)
          universityArea = await db
            .collection("areas")
            .findOne({ _id: new mongodb.ObjectID(university.area) });
        if (university.country && university.country.length > 0)
          universityCountry = await db
            .collection("countries")
            .findOne({ _id: new mongodb.ObjectID(university.country) });
        let universityColleges = [];
        for (let j = 0; j < university.colleges.length; j++) {
          const currentCollegeID = university.colleges[j];
          const college = await db
            .collection("colleges")
            .findOne({ _id: new mongodb.ObjectID(currentCollegeID) });
          universityColleges.push(college);
        }
        let universitySpecializations = [];
        for (let j = 0; j < university.specializations.length; j++) {
          const currentSpecializationID = university.specializations[j];
          const specialization = await db
            .collection("specializations")
            .findOne({ _id: new mongodb.ObjectID(currentSpecializationID) });
          universitySpecializations.push(specialization);
        }
        let universityScientificDegrees = [];
        for (let j = 0; j < university.scientificDegrees.length; j++) {
          const currentScientificDegreeID = university.scientificDegrees[j];
          const scientificDegree = await db
            .collection("degrees")
            .findOne({ _id: new mongodb.ObjectID(currentScientificDegreeID) });
          universityScientificDegrees.push(scientificDegree);
        }
        let universityPrograms = [];
        for (let j = 0; j < university.programs.length; j++) {
          const currentProgramsID = university.programs[j];
          const program = await db
            .collection("programs")
            .findOne({ _id: new mongodb.ObjectID(currentProgramsID) });
          universityPrograms.push(program);
        }
        let universityLanguages = [];
        for (let j = 0; j < university.languages.length; j++) {
          const currentLanguageID = university.languages[j];
          const language = await db
            .collection("languages")
            .findOne({ _id: new mongodb.ObjectID(currentLanguageID) });
          universityLanguages.push(language);
        }
        university.state = universityState || "";
        university.area = universityArea || "";
        university.country = universityCountry || "";
        university.colleges = universityColleges;
        university.specializations = universitySpecializations;
        university.scientificDegrees = universityScientificDegrees;
        university.programs = universityPrograms;
        university.languages = universityLanguages;
        return res.status(200).send(university);
      } else {
        return res.status(404).send({ message: "university was not found!" });
      }
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" });
    }
  }
}

export default allowCors(handler);
