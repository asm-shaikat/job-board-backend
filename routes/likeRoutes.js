const express = require("express")
const router = express.Router()
const likeController = require("../controller/likeController")
const auth =require("../middlewares/auth")

router.post("/likes/:jobId/toggle",auth,likeController.toggleLike)
router.get("/:jobId",auth,likeController.getLikesByJob)

module.exports = router