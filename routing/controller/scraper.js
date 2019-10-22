const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../../db");
module.exports = {
    scrape: (url,callback) => {
        axios.get(url).then(response => {

            let $ = cheerio.load(response.data);
            let results = [];
            $("div.thing").each((i, element) => {

                let title = $(element).children().find(".may-blank").text();
                let thumbnail = $(element).children("a.thumbnail").attr("href").toString();
                let author = $(element).children().find(".author").text();
                let link = $(element).children().find(".may-blank").attr("href");

                let item = {
                    title,
                    link,
                    thumbnail,
                    author,
                }
                // results.push({
                //     title,
                //     link,
                //     thumbnail,
                //     author,
                    
                // });
                this.pushToDb(item)
            });
            callback("200");
        });

    },
    pushToDb: (data) => {
        db.ScrapedPost.create(data, (er, result) =>{

        });
        console.log(dataArray);


    }
}