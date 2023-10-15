const Comment=require("../models/comment");
const Post=require("../models/post")

module.exports.addComment=function(req,res){
    // console.log("req body for comment adding ",req.body);
    Post.findById(req.body.post).then((post)=>{
        if(post)
        {
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post,
            }).then((comment)=>{
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            }).
            catch((err)=>{
                console.log("error in adding comment",err);
                return;
            })
        }
    })
    .catch((err)=>{
        console.log("error in finding post associated with the comment ",err);
    })
    return res.redirect('/');
}


module.exports.deleteComment=function(req,res)
{
    const commentId=req.params.id;
    Comment.findById(commentId).then(async comment=>{
        let authPost=false;
        await Post.findById(req.body.post).then((post)=>{
            console.log(post.user,req.user._id);
            if(post.user==req.user.id)
            {
                authPost=true;
            }
        })
        if(comment.user==req.user.id || authPost)
        {
            
            console.log("authenticated to delete comment",comment.user,req.body.post,req.user.id);
            let postId=comment.post;
            Comment.findByIdAndDelete(commentId).then(()=>{
                console.log("succesfully deleted comment");
            })
            .catch((err)=>{
                console.log("error in deleting comment",err);
            })

            Post.findByIdAndUpdate(postId, {$pull : {comments: commentId}})
            .then(()=>{
                return res.redirect('back');
            })
            .catch((err)=>{
                console.log("error in removing comment from post database ",err);
            })
        }
        else{
            return res.redirect('back');
        }
    })
}
