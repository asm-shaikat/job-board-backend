const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {timestamps:true}
)
// Prevent duplicate likes per job/user
likeSchema.index({job:1,user:1},{unique:true})

module.exports = mongoose.model("Like",likeSchema);