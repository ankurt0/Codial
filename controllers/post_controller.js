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

module.exports.deletePost=function(req,res){
    const postId=req.params.id;
    console.log("post ID ",req.params.id);
    Post.findById(postId).then((post)=>{
        console.log(post,"post");
        if(post.user==req.user.id)
        {
            //authenticated to delete post
            console.log("authenticated to delete");
            Post.findByIdAndDelete(postId).then((post)=>{
                console.log("deleted post",post);
            });
            Comment.deleteMany({post: postId}).then(()=>{
                return res.redirect('back');
            })
            .catch((err)=>{
                console.log("error in deleting comment",err);
                return;
            })
        }
        else{
            return res.redirect('back');
        }
    })
    .catch((err)=>{
        console.log("sorry facing problems in deleting post ",err);
        return;
    })
}