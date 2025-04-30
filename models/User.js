const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:false,
        trim:true
    },
    email:{
        type:String,
        required:false,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum :['applicant','recuiter','admin'],
        default:'applicant',
    }
},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);