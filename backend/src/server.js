import dotenv from "dotenv"; dotenv.config();

import app from "./app.js";
import { connectDB } from "./db.js";

const port = process.env.PORT;

const startServer = async() => {
    const db = await connectDB();

    if(!db){
        console.log("Shutting Down The Server");
        process.exit(1);
    }

    app.listen(port , ()=>{
        console.log(`Server is running at port ${port}`);
        console.log(`DB Connected To Host :${db.connection.host}`);
    })
}

startServer()