const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ScrapedPostSchema = new Schema({

    Title: {
        type: String,
        trim: true,
        unique: true,
        required: "String is required"
      },
    link: {
        type: String,
        trim: true,
        unique: true,
        required: "String is required"
    },
    karma :{
        type: String,
        trim: true,
        required: "String is required"
    },
    author :{
        type: String,
        trim: true,
        required: "need valid author"
    },
    thumbnail :{
        type: String,
        trim: true
    },
    discussion :{
        type: String,
        trim: true,
        required: "need a valid url"
    },
    DateScraped: {
        type: Date,
        default: Date.now,
        expires: 14400
    }
});
let ScrapedPost = mongoose.model("ScrapedPost", ScrapedPostSchema );
module.exports = ScrapedPost;