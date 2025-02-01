import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

app.get("/ping", (req,res)=> res.status(200).json({ping:"pong"}) )

import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"

app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)

export default app;