const express=require('express');
const path=require('path');
const layouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
const passport=require('passport');
const session=require('express-session');
const passportLocal=require('./config/passport_local_strategy');
const mongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const port=8000;


const app=express();

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
}))

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
//to move style and script link from sub pages into the layout head
app.set('layout extractStyles', true);

app.use(layouts);
//with the help of below middleware we can pass our route handling part to router 

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    name: 'codial',
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*20)
    },
    store: mongoStore.create({ 
        mongoUrl: 'mongodb://localhost:27017/codialDB' ,
        autoRemove:'disabled'
    })
}));

app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session"
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));   


app.listen(port,function(err){
    if(err)
        {console.log("there is some error with the server ",err);}
    else{
        console.log("server is running fine on ",port);
    }
})