const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment: String,
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
},{timestamps:true})

module.exports = mongoose.model("Comment",CommentSchema);