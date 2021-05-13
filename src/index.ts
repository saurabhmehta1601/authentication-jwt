import { config } from "dotenv"
config()
import express from "express"
import cookieParser from "cookie-parser" 
import cors from "cors"
import apiRouter from "./routes/api"
import connectDB from "./config/connectDb"
connectDB()
const PORT  = process.env.PORT || 4000 

const app =express()
// middleware cookie handling in express
app.use(express.json())
app.use(cookieParser())
// middle to read json from req body
// middle to read urlencoded from req body
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin : "http://localhost:3000",
    credentials:true
}))



app.use("/api",apiRouter)


app.listen(PORT,()=>{
    console.log("> Express server running ");
})
