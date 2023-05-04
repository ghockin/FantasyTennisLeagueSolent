import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { squadsRouter } from "./routes/squads.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/squads", squadsRouter);

mongoose.connect(
    "mongodb+srv://fantasytennisleague:fantasytennisleague12@cluster0.4md4wvd.mongodb.net/fantasytennisleague?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.listen(3001, () => {
    console.log("Server is running")
})