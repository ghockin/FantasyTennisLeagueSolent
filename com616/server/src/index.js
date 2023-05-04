import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { squadsRouter } from "./routes/squads.js";
import axios from 'axios';
import * as cheerio from 'cheerio';

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


//Web Scrap
const bbcNewsUrl= 'https://www.theguardian.com/sport/tennis'
axios(bbcNewsUrl).then(response => {
    const html = response.data;
    const articles = [];
    const $ = cheerio.load(html);
    $('.fc-item__content ', html).each(function(){
        const title = $(this).text();
        const url = $(this).find('a');
        articles.push({
            title,
            url,
        })
    })
    articles.length = 4;
    console.log(articles);
}).catch(err => console.log(err))


app.listen(3001, () => {
    console.log("Server is running")
})