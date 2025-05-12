const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const { comment, job } = req.body;
    const user = req.user.id;

    const newComment = new Comment({ comment, job, user });
    await newComment.save();

    res.status(201).json({ success: true, data: newComment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCommentByJob = async (req,res)=>{
    try{
        const {jobId} = req.params ;
        const comments = await Comment.find({job: jobId})
        .populate("user","name email")
        .sort({createdAt: -1})
        res.status(200).json({success:true,data:comments})
    }catch(err){
        res.status(501).json({success:false,message:err.message})
    }
}

exports.deleteComment = async (req,res)=>{
    try{
        const {commentId} = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({success:false,message:"Comment not found"})
        }

        if(comment.user.toString()!==userId.toString()){
            return res.status(403).json({success:false,message: "Unauthorize"})
        }

        await comment.deleteOne();

        res.status(200).json({success:true,message:"Comment deleted"})

    }catch (err){
        res.status(501).json({success:false,message:err.message})
    }
}