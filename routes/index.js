const express = require('express');


const  router = express.Router();
module.exports = router;
const indexController = require('../controllers/index_controlers');

//roues all requests wit prefix /day to day.js in routes
router.use('/day',require('./day'));

//creates new habit
router.post('/new-habit',indexController.newHabit);

//search all the habits for a respective date
router.get('/habit',indexController.habitForDate);

// detail show of a habit for the previous 7 days
router.get('/habit-show/:id',indexController.habitShowId);

//home page which directs to todays date habits 
router.get('/',function(req,res){
    return res.redirect('/day/0');
});
