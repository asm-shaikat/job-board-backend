const Like = require("../models/Like");
const Job = require("../models/Job");

exports.toggleLike = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    console.log("JobID:", jobId);
    console.log("UserID:", userId);

    const existingLike = await Like.findOne({ job: jobId, user: userId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      return res.status(200).json({ message: "Unliked job" });
    }

    const newLike = await Like.create({ job: jobId, user: userId });
    res.status(201).json({ message: "Liked job", like: newLike });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getLikesByJob = async (req, res) => {
  try {
    const { jobId } = req.params.jobId;
    console.log("JobId",jobId)
    const like = await Like.find({ job: jobId }).populate("user", "name email");
    res.status(200).json({ message: "Like fetches", like });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
