const Comment=require("../models/comment");
const Post=require("../models/post")

module.exports.addComment=function(req,res){
    console.log("req body for comment adding ",req.body);
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

