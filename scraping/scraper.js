const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../db");
module.exports = {
    scrape: async (url, callback) => {
        let response = await axios.get(url);
        if (response) {
            let $ = cheerio.load(response.data);
            let counter = 0;
            $("div.thing").each(async (i, element) => {

                let Title = $(element).children().find("a.title").text().toString();
                let karma = $(element).children("div.unvoted").find(".unvoted").text();
                let author = $(element).children().find(".author").text().toString();
                let link = $(element).children().find(".may-blank").attr("href").toString();
                let thumbnail = $(element).find("img").attr("src")
                let discussion = $(element).find(".comments").attr("href");
                if (thumbnail === `alt="reddit-icon"`) {
                    thumbnail = `./assets/images/notfound.png`;
                }

                let item = {
                    Title,
                    link,
                    karma,
                    author,
                    thumbnail,
                    discussion
                };
                let result = await db.ScrapedPost.create(item);
                if (result) {
                    if (counter === ($("div.thing").length - 1)) { //iterates over elements and performs callback when needed
                        callback("200");
                    } else {
                        counter++;
                    }

                } else {
                    console.log("error")
                    return;
                }



            });
        }
    },
    query: async (callback) => {
        let result = await db.ScrapedPost.find({});
        if (result) {
            callback(result);
        } else {
            console.log(er);
            callback("404");
        }
    },
    insertComment: (data, callback) => {
        db.Comments.create(data).then((result) => {
            callback("200");
        }).catch(() => {
            console.log('failed to create comment');
            callback("404");
        });

    },
    viewComments: (id, callback) => {
        db.Comments.find({
            postId: id
        }).then((result) => {

            callback(result);
        });
    },
    curateDb: (callback) => {
        db.ScrapedPost.countDocuments({}, (er, count) => {
            if (er) {
                console.log("line 55");
                console.log(er);
                callback("200");
            }
            if (count) {
                if (count > 25) {
                    db.ScrapedPost.drop({}).then(() => {
                        callback("200");

                    });
                } else {
                    callback("200");
                }
            } else {
                callback("200");
            }
        }).catch(() => {
            callback("200");
        });

    }

}