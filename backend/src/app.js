import express from "express";
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

app.get("/ping", (req,res)=> res.status(200).json({ping:"pong"}) )

import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"

app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)

export default app;