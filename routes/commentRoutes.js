const express = require('express');
const router = express.Router();
const commentController = require('../controller/CommentController');
const auth = require('../middlewares/auth'); // assumes JWT auth or similar

router.post('', auth, commentController.createComment);
router.get('/:jobId', commentController.getCommentByJob);
router.delete('/:commentId', auth, commentController.deleteComment);

module.exports = router;
