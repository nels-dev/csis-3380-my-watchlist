import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.js'
import crewRouter from './routes/crew.js'
import movieRouter from './routes/movie.js'
dotenv.config()
const app = express();
const port = process.env.PORT || 5001


//Connect to Mongo DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.log(err)
    process.exit(1)
});

app.use(express.json({extended: false}))
app.use(cors())
app.use("/api/users", userRouter)
app.use("/api/crews", crewRouter)
app.use("/api/movies", movieRouter)

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})