const express = require('express');
const app = express();
const port = 8000;

//server look for static files in assets
app.use(express.static('assets'));


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//to extract info from url
app.use(express.urlencoded());

app.get('/',function(req,res){
    return res.render('home');
});


//specify port 
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`running on port:${port}`);
});