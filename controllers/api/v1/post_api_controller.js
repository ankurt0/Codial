const Post=require('../../../models/post');
const User = require('../../../models/user');
const Comments = require('../../../models/comment');
const e = require('connect-flash');

module.exports.index=async function(req,res)
{
    console.log("triggered post index controller");
    try{
        let posts=await Post.find({}).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        return res.json(200,{
            message: 'checkout the post response',
            posts: posts,
        })
    }
    catch(err)
    {
        return res.json(404,{
            message: 'Internal server issue',
        })
    } 
}

module.exports.deletePost = async function(req,res)
{
    try{
        const deleteId = req.params.id;
        let post=await Post.findById(deleteId);
        if(post.user==req.user.id)
        {
            await Post.findByIdAndDelete(deleteId);
            await Comments.deleteMany({post: deleteId});
    
            return res.status(200).json({
                message: 'successfully deleted post and relevant comments',
            })
        }
        else{
            return res.status(422).json({
                message: 'not allowed to delete this post',
            })
        }
       
    }
    catch(err)
    {
        return res.status(422).json({
            message: 'Internal server issue',
        })
    }
}