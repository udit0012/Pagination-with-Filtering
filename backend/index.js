import express from 'express'
import cors from 'cors'
import users from "./routers/User.js"
import features from "./routers/Features.js"
import mongoConnect from './models/db.js'

const app = express()
const PORT = 8080

mongoConnect()
app.use(express.json())
app.use(cors())
app.use("/api",users)
// app.use("/api",features)

app.listen(PORT,()=>{
    console.log("App is started");
})