const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication ,userController.profile);
router.get('/signUp', userController.signUp);
router.get('/signIn', userController.signIn);
router.get('/signOut', userController.destroySession);
router.post('/createUser', userController.createUser);
router.post('/userLogin',
    passport.authenticate('local', {
        failureRedirect: "/signIn",
    }),
    userController.createSession
);

module.exports = router;