import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { newsRouter } from "./routes/news.js";
import { top20PlayersSolentRouter } from "./routes/top20PlayersSolent.js";
import { top20PlayersGlobalRouter } from "./routes/top20PlayersGlobal.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/news", newsRouter);
app.use("/top20PlayersSolent", top20PlayersSolentRouter);
app.use("/top20PlayersGlobal", top20PlayersGlobalRouter);

mongoose.connect(
    "mongodb+srv://fantasytennisleague:fantasytennisleague12@cluster0.4md4wvd.mongodb.net/fantasytennisleague?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const router = express.Router();

app.listen(3001, () => {
    console.log("Server is running")
})