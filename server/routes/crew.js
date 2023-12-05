import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Crew from "../models/crew.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
const router = express.Router();

// default rows of data
const dataRow = 12;

// list all crews
router.get("/", async (req, res) => {
  // const {name} = req.body;
  // const movies = await Movie.findOne({name: "Tom Cruise"}).exec();
  // const db = client.connect();
  // const crews = db.collection('crew');

  const crew = await Crew.find({})
    .sort({ popularity: -1 })
    .limit(dataRow)
    .exec();
  // console.log(crew);
  return res.status(200).json(crew);
});

router.get("/id/:id", async (req, res) => {
  const crewId = parseInt(req.params.id, 10);
  const crew = await Crew.findOne({ id: crewId }).exec();
  // console.log(crew);
  return res.status(200).json(crew);
});

// list all depts
router.get("/depts", async (req, res) => {
  Crew.distinct("known_for_department").then((deptList) => {
    return res.status(200).json(deptList);
  });
});

router.put("/favourite");

// list dept by name
// router.get("/dept/:name", async (req, res) => {

//     const deptName = req.params.name;
//     if (deptName == "Any") {
//         let crews = await Crew.find({}).sort({ popularity: -1 }).limit(dataRow).exec();
//         return res.status(200).json(crews);
//     } else if (deptName != null) {
//         let crews = await Crew.find({ department: deptName }).sort({ popularity: -1 }).limit(dataRow).exec();
//         Crew.distinct('department').then(deptList => {
//             console.log(deptList)
//         });

//         return res.status(200).json(crews);
//     }

//     return res.status(404).json("Not Found");
// });

// get crew by department with page
router.route("/dept/:name?/:page?").get(async (req, res) => {
  const deptName = req.params.name || "Any";
  const page = req.params.page || 1;
  const crewName = req.query.crewName;
  let crews = {};
  let totalCrews,
    totalPages = 0;
  try {
    if (crewName){
        if (deptName === "Any") {
        crews = await Crew.find({name: new RegExp(crewName, 'i')})
            .sort({ popularity: -1 })
            .skip((page - 1) * dataRow)
            .limit(dataRow)
            .exec();
        totalCrews = await Crew.find({name: new RegExp(crewName, 'i')}).count();
        } else {
        crews = await Crew.find({ known_for_department: deptName, name: new RegExp(crewName, 'i') })
            .sort({ popularity: -1 })
            .skip((page - 1) * dataRow)
            .limit(dataRow)
            .exec();
        totalCrews = await Crew.find({ known_for_department: deptName, name: new RegExp(crewName, 'i') }).count();
        }
    } else {
        if (deptName === "Any") {
            crews = await Crew.find({})
              .sort({ popularity: -1 })
              .skip((page - 1) * dataRow)
              .limit(dataRow)
              .exec();
            totalCrews = await Crew.find({}).count();
          } else {
            crews = await Crew.find({ known_for_department: deptName})
              .sort({ popularity: -1 })
              .skip((page - 1) * dataRow)
              .limit(dataRow)
              .exec();
            totalCrews = await Crew.find({ known_for_department: deptName }).count();
          }
    }
    totalPages = Math.ceil(totalCrews / dataRow);
    console.log(crewName);
    res.status(200).json({ crews, totalPages });
  } catch {
    (err) => res.status(400).json("Error: " + err);
  }
});

// get crew by movie
router.route("/movie/:id/:page?").get(async (req, res) => {
  const id = req.params.id;
  const page = req.params.page || 1;
  let crews = {};
  let totalCrews,
    totalPages = 0;
  try {
    crews = await Crew.find({ movies: Number(id) })
      .sort({ popularity: -1 })
      .skip((page - 1) * dataRow)
      .limit(dataRow)
      .exec();
    totalCrews = await Crew.find({ movies: Number(id) }).count();
    totalPages = Math.ceil(totalCrews / dataRow);
    res.status(200).json({ crews, totalPages });
  } catch {
    (err) => res.status(400).json("Error: " + err);
  }
});

export default router;
