const express=require('express');
const router=express.Router();
const commentController=require("../controllers/comment_controller");

router.post('/add',commentController.addComment);
router.post('/delete/:id',commentController.deleteComment);

module.exports=router;