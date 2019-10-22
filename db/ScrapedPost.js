const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ScrapedPostSchema = new Schema({
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
    DateScraped: {
        type: Date,
        default: Date.now
    }
});
const ScrapedPost = mongoose.model("ScrapedPost", ScrapedPostSchema );
module.exports = ScrapedPost;