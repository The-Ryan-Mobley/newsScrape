const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
//var db = require("../../db");
module.exports = {
    scrape: (callback) => {
        axios.get("https://old.reddit.com/r/todayilearned").then( response => {

            let $ = cheerio.load(response.data);
            let results = [];
            $("div.thing").each((i, element) => {

                let title = $(element).children().find(".may-blank").text();
                let thumbnail = $(element).children("a.thumbnail").attr("href").toString();
                let author = $(element).children().find(".author").text();
            
                let link = $(element).children().find(".may-blank").attr("href");
                
                results.push({
                  title,
                  author,
                  thumbnail,
                  link,
                  
                });
            });
            callback(results);
        });

    },
    pushToDb: (dataArray) => {
        console.log(dataArray);


    }
}