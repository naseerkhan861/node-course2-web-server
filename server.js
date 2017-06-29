const express=require('express');
const app=express();
const fs=require('fs');
const hbs=require('hbs');
const port=process.env.PORT ||3000;

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
    var log=`${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(error)=>{
        if(error){
            console.log('Could Not write to file');
        }
    });
    next();
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+"/public"));

app.get('/',(req,res)=>{
   res.render('home.hbs',{
       pageTitle:'Home Page!!!',
       welcomeMessage:'This is just a body Message and Nothing else'
       })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page!!!'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Could Not handle Bad Stuffs'
    });
});

app.get('/project',(req,res)=>{
    res.render('project.hbs',{
        pageTitle:'Projects Page'
    })
});

app.listen(port,()=>{
    console.log(`server started listening on PORT:${port}`);
})