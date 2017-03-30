const express = require('express');
const fs=require('fs');

//make an express app
var app = express();

//hbs=handlebarsjs
//now we set up hbs which is view eenginee for express
//based in Express.js

const hbs = require('hbs');

//add support for partials in hbs
hbs.registerPartials(__dirname+'/views/partials');

//set expess to use hbs view engine
app.set('view engine', 'hbs');
//now make  a directory 'views'
//eexpress uses it as a default directory for template

//app.use() to register a middleware
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n');
  next();
});
//set up middleware for the static pages
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

// step 2 SETUP THE HANDLER
// '/' for the root url
//app.get() is used to register a handler

//old home page route

// app.get('/', (req, res) => {
//     //res.send('Hello Express');
//     //res.send('<h1>Hello Express</h1>');
//     res.send({
//         name: 'shashank',
//         status: 'leader'
//     });
// });

app.get('/', (req, res) => {
    //res.send('Hello Express');
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home',
        content: 'Welcome to home page',
        //revoved beacause we are now using hbs helper
        //currentYear:new Date().getFullYear()
    });
});

//old now reeplaced with HBSS template engine
//app.get('/about',(req,res)=>{
//    res.send('About Page');
//})


app.get('/about', (req, res) => {
    //send key valur paires to fill templatee with actual data
    res.render('about.hbs', {
        pageTitle: 'About Page',
        //revoved beacause we are now using hbs helper
        //currentYear:new Date().getFullYear()
    });
});



app.get('/bad', (reeq, res) => {
    res.send({
        errorMessage: 'Cannot Find the Page'
    });
})


//STEP 3
//BIND THE HANDLER TO TE PORT

//app.listen(3000);
app.listen(3000, () => {
    console.log('Server is up');
})
