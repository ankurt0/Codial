const Post=require('../models/post');

module.exports.createPost=function(req,res){
    console.log("req ",req.body,req.user);
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then((post)=>{
        return res.redirect('/');
    })
    .catch((err)=>{
        console.log("error in creating post ",err);
        return;
    })

}