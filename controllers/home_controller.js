module.exports.home=function(req,res)
{
    console.log("cookies ",res);
    return res.render('home',{title: 'Home'});
}