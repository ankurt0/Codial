const express=require('express');
const router=express.Router();
const userAPIController=require('../../../controllers/api/v1/user_api_controller');

router.post('/create-session',userAPIController.createSession);

module.exports=router;