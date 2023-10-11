const express=require('express');
const path=require('path');
const layouts=require('express-ejs-layouts');
const port=8000;

const db=require('./config/mongoose');

const app=express();

app.use(express.static('./assets'));
//to move style and script link from sub pages into the layout head
app.set('layout extractStyles', true);

app.use(layouts);
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