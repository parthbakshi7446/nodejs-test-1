
const Habit = require('../models/habit');
const History = require('../models/history');

module.exports.updateHomeWithDate = function(date,req,res){
    let today = new Date().getDate();
    Habit.find({from:{$lte:+date}},function(err,habits){
        if(err){console.log(err);return res.redirect('/');}
        let status=[]
        History.find({date:{$gte:today-6}},function(err,historys){
            if(err){console.log("error fetching historys at home");return;}
            let count=0;
            let flag=0;
            for(let history of historys){
                // history contains data for that date
                
                if(history.date == date){
                    flag=1;
                    for(let habit of habits){
                        if(history.done.includes(habit.id)){
                            status[count] = "done";
                            count++;
                        }
                        else if(history.notdone.includes(habit.id)){
                            status[count] = "notdone";
                            count++;
                        }
                        else{
                            status[count] = "none";
                            count++;
                        }
                    }
                    break;
                }
            }
            if(flag==0){
                for(let habit of habits){
                    status[count] = "none";
                    count++;
                }
            }
            return res.render('home',{
                habits:habits,
                date:date,
                status:status
            });
        });
    });
}

