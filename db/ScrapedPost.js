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
    thumbnail :{
        type: String,
        trim: true,
        required: "need url"
    },
    author :{
        type: String,
        trim: true,
        required: "need valid author"
    },
    DateScraped: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
      }
});
let ScrapedPost = mongoose.model("ScrapedPost", ScrapedPostSchema );
module.exports = ScrapedPost;