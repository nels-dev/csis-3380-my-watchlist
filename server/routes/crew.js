import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Crew from "../models/crew.js"
import dotenv from "dotenv"
import {MongoClient} from "mongodb"
const router = express.Router();




router.get("/:row", async(req, res)=>{
    // const {name} = req.body;
    // const movies = await Movie.findOne({name: "Tom Cruise"}).exec();
    // const db = client.connect();
    // const crews = db.collection('crew');
    const row = parseInt(req.params.row, 10)

    const crew = await Crew.find({}).sort({popularity: -1}).limit(row).exec();

    console.log(crew)
    
    return res.status(200).json(crew)

})
export default router;