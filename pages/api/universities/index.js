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
        query: { specialization },
      } = req;
      const { client, db } = await connectToDatabase();
      const query = {};
      if (specialization && specialization.length > 0) {
        query.specializations = { $in: [specialization] };
      }
      const universities = await db
        .collection("universities")
        .find(query)
        .toArray();

      const result = [];
      for (let i = 0; i < universities.length; i++) {
        let currentUniversity = universities[i];
        let currentUniversityState;
        let currentUniversityArea;
        let currentUniversityCountry;
        if (currentUniversity.state && currentUniversity.state.length > 0)
          currentUniversityState = await db
            .collection("states")
            .findOne({ _id: new mongodb.ObjectID(currentUniversity.state) });
        if (currentUniversity.area && currentUniversity.area.length > 0)
          currentUniversityArea = await db
            .collection("areas")
            .findOne({ _id: new mongodb.ObjectID(currentUniversity.area) });
        if (currentUniversity.country && currentUniversity.country.length > 0)
          currentUniversityCountry = await db
            .collection("countries")
            .findOne({ _id: new mongodb.ObjectID(currentUniversity.country) });
        let currentUniversityColleges = [];
        for (let j = 0; j < currentUniversity.colleges.length; j++) {
          const currentCollegeID = currentUniversity.colleges[j];
          const college = await db
            .collection("colleges")
            .findOne({ _id: new mongodb.ObjectID(currentCollegeID) });
          currentUniversityColleges.push(college);
        }
        let currentUniversitySpecializations = [];
        for (let j = 0; j < currentUniversity.specializations.length; j++) {
          const currentSpecializationID = currentUniversity.specializations[j];
          const specialization = await db
            .collection("specializations")
            .findOne({ _id: new mongodb.ObjectID(currentSpecializationID) });
          currentUniversitySpecializations.push(specialization);
        }
        let currentUniversityScientificDegrees = [];
        for (let j = 0; j < currentUniversity.scientificDegrees.length; j++) {
          const currentScientificDegreeID =
            currentUniversity.scientificDegrees[j];
          const scientificDegree = await db
            .collection("degrees")
            .findOne({ _id: new mongodb.ObjectID(currentScientificDegreeID) });
          currentUniversityScientificDegrees.push(scientificDegree);
        }
        let currentUniversityPrograms = [];
        for (let j = 0; j < currentUniversity.programs.length; j++) {
          const currentProgramsID = currentUniversity.programs[j];
          const program = await db
            .collection("programs")
            .findOne({ _id: new mongodb.ObjectID(currentProgramsID) });
          currentUniversityPrograms.push(program);
        }
        let currentUniversityLanguages = [];
        for (let j = 0; j < currentUniversity.languages.length; j++) {
          const currentLanguageID = currentUniversity.languages[j];
          const language = await db
            .collection("languages")
            .findOne({ _id: new mongodb.ObjectID(currentLanguageID) });
          currentUniversityLanguages.push(language);
        }
        currentUniversity.state = currentUniversityState || "";
        currentUniversity.area = currentUniversityArea || "";
        currentUniversity.country = currentUniversityCountry || "";
        currentUniversity.colleges = currentUniversityColleges;
        currentUniversity.specializations = currentUniversitySpecializations;
        currentUniversity.scientificDegrees =
          currentUniversityScientificDegrees;
        currentUniversity.programs = currentUniversityPrograms;
        currentUniversity.languages = currentUniversityLanguages;
        result.push(currentUniversity);
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ error: "there was an error happened!" + error });
    }
  }
}

export default allowCors(handler);
