const express = require('express');
const Habit = require('../models/habit');
const History = require('../models/history');

const  router = express.Router();
module.exports = router;

//server look for static files in assets
router.use(express.static('assets'));

function updateHomeWithDate(date,req,res){
    Habit.find({from:{$lte:+date}},function(err,habits){
        if(err){console.log(err);return res.redirect('/');}
        return res.render('home',{
            habits:habits,
            date:date
        });
    });
}


router.get('/:day',function(req,res){
    
    let day = req.params.day;
    let date = new Date();
    return updateHomeWithDate(date.getDate()-day,req,res);
});