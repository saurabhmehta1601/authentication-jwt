import { config } from "dotenv"
config()
import express from "express"
import cookieParser from "cookie-parser" 
import cors from "cors"
import {verify} from "jsonwebtoken"
import {hash,compare} from "bcryptjs"

const app =express()

