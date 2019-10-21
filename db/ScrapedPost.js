const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ScrapedPost = new Schema({
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
    thumbnail :{
        type: String,
        trim: true,
        required: "need url"
    },
    Subreddit: {
        type: String,
        trim: true,
        required: "String is required"
    }
});
module.exports = ScrapedPost;