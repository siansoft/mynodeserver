const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

var app = express(); //strating express
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs'); //setting the templeting type

//Making middelware for express
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('serverlog.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server log')
        }
        
    });
    next();
});
//.use((req,res,next)=>{
   // res.render('maintenance.hbs');
//});
app.use(express.static(__dirname + '/public'));

app.get('/',(req, res)=>{

   res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Home page',
    currentYear: new Date().getFullYear(),
     homelinkDesc: 'HOME',
     aboutlinkDesc: 'ABOUT'
});
});
app.get('/about',(req, res)=>{
    //res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page',
        welcomeMessage: 'Welcome to About page',
        currentYear: new Date().getFullYear(),
        homelinkDesc: 'HOME',
        aboutlinkDesc: 'ABOUT'
    });
});

app.get('/bad',(req, res)=>{
    res.send({
        errorMessage: 'Unable to andle request'
    })
});
app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});