const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../db");
module.exports = {
    scrape: (url,callback) => {
        axios.get(url).then(response => {
            let $ = cheerio.load(response.data);
            $("div.thing").each((i, element) => {

                let Title = $(element).children().find("a.title").text().toString();
                let karma = $(element).children("div.unvoted").find(".unvoted").text();
                let author = $(element).children().find(".author").text().toString();
                let link = $(element).children().find(".may-blank").attr("href").toString();
                let thumbnail = $(element).find("img").attr("src")
                let discussion = $(element).find(".comments").attr("href");

                let item = {
                    Title,
                    link,
                    karma,
                    author,
                    thumbnail,
                    discussion
                };
                
                db.ScrapedPost.create(item).then(result =>{
                }).catch((err)=>{
                    console.log(err);
                });   

            });
            callback("200");
        });
    },
    query: (callback) => {
        db.ScrapedPost.find({}).then( result => {
            callback(result);
        });
    },
    insertComment: (data, callback) => {
        db.Comments.create(data).then((result)=>{
             callback("200");
        }).catch(()=>{console.log('failed to create comment'); callback("404");});

    },
    viewComments: (id, callback) => {
        db.Comments.find({postId: id}).then((result)=>{
            console.log("line 49 quering");
            callback(result);
        });
    },
    curateDb: (callback) => {
        db.ScrapedPost.countDocuments({},(er,count) =>{
            if(er){
                console.log("line 55");
                console.log(er);
                callback("200");
            }
            if(count){
                if(count > 25){
                    db.ScrapedPost.deleteMany({}).exec(()=>{
                        console.log("*************************line 63");
                        callback("200");
                        
                    });
                } else{
                    console.log("*************************line 68");
                    callback("200");
                }
            } else{
                console.log("*************************line 72");
                callback("200");
            }
        }).catch(()=>{
            console.log("*************************line 76");
            callback("200");
        });

    }

}