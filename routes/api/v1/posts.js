const express=require('express');
const router=express.Router();
const postAPIController=require('../../../controllers/api/v1/post_api_controller');
const passport = require('passport');

router.get('/',postAPIController.index);
router.delete('/:id',passport.authenticate('jwt',{session: false}),postAPIController.deletePost);


module.exports=router;