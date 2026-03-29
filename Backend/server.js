import dotenv from "dotenv";
import mongoose from "mongoose"
import express from "express";
import router1 from "./routes/authRoutes.js"
import router2 from "./routes/taskRoutes.js"
import cors from "cors"

dotenv.config();

try{
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected");
} catch(err) {
    console.log(err);
}

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", router1);
app.use("/api/v1/tasks", router2);


app.listen(3000);