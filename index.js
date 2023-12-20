//module -es6 modules ->import/export
//commonJS modules-> require/module.exports

import express from "express";
import { config } from "dotenv";//ספריה שנותנת ליאפשרו תלגשת למשתני סביבה שמוגדרים בתוך דף בתיקיה זו
import morgan from "morgan";

import bookRouter from "./routes/book.js";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";

config();
const app = express();
const mongoURI = process.env.DB_CONNECTION || "mongodb://localhost:27017";
mongoose.connect(`${mongoURI}/${process.env.DB_NAME || "library"}`)
    .then(suc => { console.log("mongDB connected on host" + suc.connection.host) })
    .catch(err => {
        console.log(err);
        console.log("canot connect mongo db");
        process.exit(1);
    })

app.use(express.json());
app.use(morgan("common"));

app.use("/api/book", bookRouter);
app.use("/api/user", userRouter);




let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listetnig on port ${port}`)
})