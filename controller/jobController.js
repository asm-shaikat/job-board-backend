const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try{
        const job = await Job({...req.body,postedBy:req.user.id})
        await job.save();
        res.status(201).json({message:"Job created successfully",job});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.getJobs = async (req, res) => {
    try{
        const jobs = await Job.find().populate("postedBy", "name email");
        res.status(200).json({message:"Jobs fetched successfully",jobs});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.getJobById = async (req, res) => {
    try{
       const job = await Job.findById(req.params.id)
       console.log(job);
         if(!job){
              return res.status(404).json({message:"Job not found"});
         }
         res.status(200).json({message:"Job fetched successfully",job});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({message: "Job not found"});
        }
        
        if (!job.postedBy || job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }        
        
        Object.assign(job, req.body);
        await job.save();
        res.status(200).json({message: "Job updated successfully", job});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

exports.deleteJob = async (req, res) => {
    try{
        const job = await Job.findById(req.params.id)
        if(!job){
            return res.status(404).json({message:"Job not found"});
        }
        if(job.postedBy.toString() !== req.user.id){
            return res.status(401).json({message:"Unauthorized"});
        }
        await job.remove();
        res.status(200).json({message:"Job deleted successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
