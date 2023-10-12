const express = require('express');
const router = express.Router();
const postController=require('../controllers/post_controller');
const passport = require('passport');

router.use('/create',passport.checkAuthentication,postController.createPost);

module.exports=router;