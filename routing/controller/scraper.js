const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
var db = require("../../db");
module.exports = {
    scrape = () => {
        axios.get("https://old.reddit.com/r/todayilearned").then( response => {

            let $ = cheerio.load(response.data);
            let results = [];
            $("p.title").each((i, element) => {

                let title = $(element).text();
                let thumbnail = $(elementt)
                let author = $(element)
            
                let link = $(element).children().attr("href");
                
                results.push({
                  title: title,
                  link: link
                });
            });
        });

    },
    pushToDb = (dataArray) => {


    }
}