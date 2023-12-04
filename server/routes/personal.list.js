import express from "express";
import Favourite from "../models/favourite.js";
import Crew from '../models/crew.js'
import Movie from '../models/movie.js'
const router = express.Router();

router.get("/fav-crew", async(req, res)=>{
    const favCrew = await Favourite.find({userId: req.auth.id, type:'crew'}).exec()
    const result = await Crew.find({id: {"$in": favCrew.map(c=>c.targetId)}})
    res.json(result)
})

router.get("/fav-movie", async(req, res)=>{
    const favMovie = await Favourite.find({userId: req.auth.id, type:'movie'}).exec()
    const result = await Movie.find({id: {"$in": favMovie.map(m=>m.targetId)}})
    res.json(result)
})

router.get("/fav-crew/:id", async(req, res)=>{
    const favCrew = await Favourite.findOne({userId: req.auth.id, type:'crew', targetId: req.params.id}).exec()
    if(!favCrew) {
        res.sendStatus(404)
    }else{
        res.json(favCrew)
    }
    
})

router.delete("/fav-movie/:id", async(req, res)=>{
    await Favourite.deleteOne({userId: req.auth.id, type:'movie', targetId: req.params.id}).exec()
    res.sendStatus(204)
})

router.delete("/fav-crew/:id", async(req, res)=>{
    await Favourite.deleteOne({userId: req.auth.id, type:'crew', targetId: req.params.id}).exec()
    res.sendStatus(204)
})

router.get("/fav-movie/:id", async(req, res)=>{
    const favMovie = await Favourite.findOne({userId: req.auth.id, type:'movie', targetId: req.params.id}).exec()    
    if(!favMovie) {
        res.sendStatus(404)
    }else{
        res.json(favMovie)
    }
    
})

router.post("/fav-crew", async(req, res)=>{
    const { id } = req.body;
    await new Favourite({
        userId: req.auth.id, 
        type:'crew', 
        targetId:Number(id)}
        ).save()
    res.sendStatus(201)
})

router.post("/fav-movie", async(req, res)=>{
    const { id } = req.body;
    await new Favourite({
        userId: req.auth.id, 
        type:'movie', 
        targetId:Number(id)}
        ).save()
    res.sendStatus(201)
})
export default router;