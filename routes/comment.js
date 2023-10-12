const express=require('express');
const router=express.Router();
const commentController=require("../controllers/comment_controller");

router.use('/add',commentController.addComment);

module.exports=router;