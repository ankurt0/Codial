const express=require('express');
const path=require('path');
const port=8000;

const app=express();

//with the help of below middleware we can pass our route handling part to router 
app.use('/',require('./routes'));   
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.listen(port,function(err){
    if(err)
        {console.log("there is some error with the server ",err);}
    else{
        console.log("server is running fine on ",port);
    }
})