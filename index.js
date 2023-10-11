const express=require('express');
const port=8000;

const app=express();

app.listen(port,function(err){
    if(err)
        {console.log("there is some error with the server ",err);}
    else{
        console.log("server is running fine on ",port);
    }
})