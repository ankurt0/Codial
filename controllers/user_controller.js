const User=require('../models/user');

module.exports.profile=function(req,res)
{
    return res.render('profile',{title: 'Profile'});
}

module.exports.signUp=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('profile');
    }
    return res.render('userSignUp',{title: 'Sign Up'});
}

module.exports.signIn=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('profile');
    }
    return res.render('userSignIn',{title: 'Sign In'});
}

module.exports.createUser=function(req,res)
{
    // console.log(req.body);
    User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    })
    .then(()=>{
        console.log("succesfully created user");
    })
    .catch((err)=>{
        console.log("getting some difficulty in registering user",err);
        return;
    })
    return res.redirect('signIn');
}

module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}

module.exports.destroySession=function(req,res)
{
    req.logout((err)=>{
        console.log("Error in logging out ",err);
    });

    return res.redirect('/');
}