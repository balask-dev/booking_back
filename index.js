import mongoose from "mongoose";
import express from "express";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const URL = process.env.MONGO_URL;
mongoose.connect(URL, {useNewUrlParser: true,useUnifiedTopology: true},
  ()=>console.log("connected"))


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.listen(process.env.PORT, () => {console.log("Connected")});
