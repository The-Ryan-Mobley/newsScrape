const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentsSchema = new Schema({
    username :{
        type: String,
        trim: true,
        required: "need user"
    },
    body :{
        type: String,
        required: "you gotta type something here"
    },
    postId :{
        type: String,
        trim: true,
        required: "need associated Post"
    }

});
let Comments = mongoose.model("Comments", CommentsSchema );
module.exports = Comments;