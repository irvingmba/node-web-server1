const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT||3000;

var app=express();

app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
   return text.toUpperCase();
});


app.use((req,res,next)=>{
   var now=new Date().toString();
   console.log(`${now}:${req.method} ${req.url}`);
   next();
});

// app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
// });

app.get('/',(req,res)=>{
   res.render('home.hbs',{
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my website'
      // currentYear: new Date().getFullYear()
   })
});
app.get("/about",(req,res)=>{
   res.render('about.hbs',{
      pageTitle: "About Page"
      // currentYear: new Date().getFullYear()
   });
});
app.get("/bad",(req,res)=>{
   res.send({
      errorMessage: "Unable to handle request"
   });
});
app.get("/projects",(req,res)=>{
   res.render('projects.hbs',{
      pageTitle: "Projects"
      // currentYear: new Date().getFullYear()
   });
});


app.use(express.static(__dirname+'/public'));



app.listen(port,()=>{
   console.log(`Server is up on port ${port}`);
});