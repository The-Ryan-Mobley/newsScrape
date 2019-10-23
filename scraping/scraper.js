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
                
                db.ScrapedPost.count({},(er,count) =>{
                    if(count > 60){
                        db.ScrapedPost.remove({}).exec(()=>{
                            db.ScrapedPost.create(item).then(result =>{
                            }).catch((err)=>{
                                //console.log(err);
                            });
                        });
                    } else{
                        db.ScrapedPost.create(item).then(result =>{
                                    
                        }).catch((err)=>{
                            //console.log(err);
                        });
                    }
                });
                

            });
            callback("200");
        });
    },
    query: callback => {
        db.ScrapedPost.find({}).then( result => {
            callback(result);
        });
    },
    insertComment: (data,id, callback) => {
        db.Comments.create(data).then((result)=>{
            return db.ScrapedPost.findOneAndUpdate({ _id: id }, { comments: result._id }, { new: true })

        }).then(()=>{
               callback("200");  
        }).catch(()=>{console.log('failed to create comment'); callback("404");});

    },
    viewComments: (id, callback) => {
        db.ScrapedPost.findOne({_id: id}).populate("comments").then((result)=>{
            callback(result);
        });
    }
}