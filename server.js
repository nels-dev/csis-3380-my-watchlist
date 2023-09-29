import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5001
app.use(cors())
app.get("/", (req, res)=>{
    res.send("Hello from Server")
})

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})