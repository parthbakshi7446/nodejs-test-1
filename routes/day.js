const express = require('express');


const  router = express.Router();
module.exports = router;

const dayController = require('../controllers/day_controllers');

//server look for static files in assets
router.use(express.static('assets'));

//updates home page with all habits of a specific date
router.get('/:day',function(req,res){
    
    let day = req.params.day;
    let date = new Date();
    return dayController.updateHomeWithDate(date.getDate()-day,req,res);
});