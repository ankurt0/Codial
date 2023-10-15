const Post=require('../models/post');
const User = require('../models/user');

module.exports.home=function(req,res)
{
    // console.log("cookies ",res);
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user',
        }
    })
    .then((posts)=>{
        User.find({}).then((users)=>{
            return res.render('home',{title: 'Home',posts: posts, allUsers: users});
        })
        .catch((err)=>{
            console.log("ERROR ",err);
            return;
        })
    })
    .catch((err)=>{
        console.log("error in home postss",err);
        return;
    })
}