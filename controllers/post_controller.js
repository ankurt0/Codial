const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.createPost=function(req,res){
    // console.log("req ",req.body,req.user);
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

module.exports.deletePost=async function(req,res){
    const postId=req.params.id;
    console.log("post ID ",req.params.id);
    try{
        let post=await Post.findById(postId);
        if(post.user==req.user.id)
        {
            await Post.findByIdAndDelete(postId);
            await Comment.deleteMany({post: postId})
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("sorry facing problems in deleting post ",err);
        return;
    }
}