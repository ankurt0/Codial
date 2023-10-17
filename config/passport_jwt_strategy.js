const passport=require('passport');
const jwtStrategy=require('passport-jwt').Strategy;
const extractJwt=require('passport-jwt').ExtractJwt;        // extract jwt from header
const User = require('../models/user');

let opts={
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codial',
}

passport.use(new jwtStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id).then((user)=>{
        if(user)
        {
            done(null,user);
        }
        else{
            done(null,false);
        }
    })
    .catch((err)=>{
        done(err,false);
    })
}))

module.exports = passport;