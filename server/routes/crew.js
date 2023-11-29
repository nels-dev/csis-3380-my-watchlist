import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Crew from "../models/crew.js"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
const router = express.Router();

// default rows of data
const dataRow = 12;


// list all crews
router.get("/", async (req, res) => {
    // const {name} = req.body;
    // const movies = await Movie.findOne({name: "Tom Cruise"}).exec();
    // const db = client.connect();
    // const crews = db.collection('crew');

    const crew = await Crew.find({}).sort({ popularity: -1 }).limit(dataRow).exec();

    console.log(crew)

    return res.status(200).json(crew)

});

router.get("/id/:id", async (req, res) => {
    const crewId = parseInt(req.params.id, 10);
    const crew = await Crew.find({ id: crewId }).exec();
    // console.log(crew);
    return res.status(200).json(crew);

});

// list all depts
router.get("/depts", async (req, res) => {

    Crew.distinct('department').then(deptList => {
        return res.status(200).json(deptList);
    });


});

// list dept by name
router.get("/dept/:name", async (req, res) => {

    const deptName = req.params.name;
    if (deptName == "Any") {
        let crews = await Crew.find({}).sort({ popularity: -1 }).limit(dataRow).exec();
        return res.status(200).json(crews);
    } else if (deptName != null) {
        let crews = await Crew.find({ department: deptName }).sort({ popularity: -1 }).limit(dataRow).exec();
        Crew.distinct('department').then(deptList => {
            console.log(deptList)
        });

        return res.status(200).json(crews);
    }

    return res.status(404).json("Not Found");
});




export default router;