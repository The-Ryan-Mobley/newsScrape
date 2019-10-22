const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../db");
module.exports = {
    scrape: (url,callback) => {
        axios.get(url).then(response => {

            let $ = cheerio.load(response.data);
            
            $("div.thing").each((i, element) => {

                let Title = $(element).children().find(".may-blank").text().toString();
                let thumbnail = $(element).children("a.thumbnail").attr("href").toString();
                let author = $(element).children().find(".author").text().toString();
                let link = $(element).children().find(".may-blank").attr("href").toString();

                let item = {
                    Title,
                    link,
                    thumbnail,
                    author,
                    
                };
                console.log(item);
                console.log(`*******************************INSTERTING`);
                db.ScrapedPost.create(item).then(result =>{
                    console.log(result);
                }).catch((err)=>{
                    console.log(err);

                });


            });
            callback("200");
        });
    },
    query: (callback) => {
        db.ScrapedPost.find({}).then( result => {
            console.log(result);
            callback(result);
        })

    }
}