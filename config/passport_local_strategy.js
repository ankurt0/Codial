const passport=require('passport');
const User = require('../models/user');
const localStrategy=require('passport-local').Strategy;

passport.use(new localStrategy({
        usernameField: 'email',
    },
    function(email,password,done){
    User.findOne({email:email})
    .then((user)=>{
        if(!user || user.password!==password){
            return done(null,false);
        }
        return done(null,user);
    })
    .catch((err)=>{
        console.log("error in authentication--->passport");
        return done(err);
    })
}));

//serializing the user to decide which key is to be set as cookie
passport.serializeUser((user,done)=>{
    console.log("serializer invoked");
    done(null,user.id);
})

//deserializing the user from key cookie
passport.deserializeUser((id,done)=>{
    console.log("deserializer invoked");
    User.findById(id)
    .then((user)=>{
        done(null,user);
    })
    .catch((err)=>{
        console.log("error in deserializing user");
        done(err);
    })
});

passport.checkAuthentication=((req,res,next)=>{
    if(req.isAuthenticated())
    {
        return next();
    }

    return res.redirect('signIn');
})

passport.setAuthenticatedUser=((req,res,next)=>{
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
    }
    
    next();
})



module.exports=passport;
