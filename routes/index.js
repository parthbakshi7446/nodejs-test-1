const express = require('express');
const Habit = require('../models/habit');
const History = require('../models/history');

const  router = express.Router();
module.exports = router;

router.use('/day',require('./day'));

router.post('/new-habit',function(req,res){
    console.log(req.body.from);
    if(new Date(req.body.from).getDate()>new Date().getDate()){
        return res.redirect('back');
    }
    Habit.create({
        name:req.body.name,
        from:parseInt(new Date(req.body.from).getDate() || new Date().getDate(),10)
    },function(err,habit){
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        // console.log(habit);
    });
    return res.redirect('back');
});

router.get('/habit',function(req,res){
    console.log(req.query);
    let id = req.query.id;
    let done = req.query.done;
    let date = req.query.date;
    History.findOne({date:date},function(err,history){
        if(err){console.log(err);return;}
        
        if(history){
            let count=0;
            for(let i of history.done){
                if(i==id){
                    history.done.splice(count,1);
                    break;
                }
                count++;
            }
            count=0;
            for(let i of history.notdone){
                if(i==id){
                    history.notdone.splice(count,1);
                    break;
                }
                count++;
            }
            count=0;
            for(let i of history.none){
                if(i==id){
                    history.none.splice(count,1);
                    break;
                }
                count++;
            }
            if(+done==1){
                if(!history.done){
                    history.done = new Array();
                }
                history.done.push(id);
                console.log("done");
            }
            else if(+done==2){
                if(!history.notdone){
                    history.notdone = new Array();
                }
                history.notdone.push(id);
                console.log("notdone");
            }
            else if(+done==0){
                if(!history.none){
                    history.none = new Array();
                }
                history.none.push(id);
                console.log("none");
            }
            else{
                console.log("issue in finding apt done value");
            }
            history.save();
        }
        else{
            History.create({
                date:date,
                done: new Array(),
                notdone: new Array(),
                none: new Array()
            },function(err,history){
                if(err){console.log("error creaing history for date");return;}
                if(+done==1){
                    history.done.push(id);
                    console.log("donec");
                }
                else if(+done==2){
                    history.notdone.push(id);
                    console.log("notdonec");
                }
                else if(+done==0){
                    history.none.push(id);
                    console.log("nonec");
                }
                else{
                    console.log("issue in finding apt done value");
                }
                history.save();
            });

        }
        console.log(history);
        
        return res.redirect('back');
    })
    
});

router.get('/habit-show/:id',function(req,res){
    console.log(req.params.id);
    let id = req.params.id;
    let today = new Date().getDate();
    History.find({date:{$gte:today-6}},function(err,historys){
        if(err){console.log("error getting history");return;}
        let status = [];
        let count=0;
        for(let i=6;i>=0;i--){
            let flag=1;
            for(let j of historys){
                if(j.date==today-i){
                    flag=0;
                    if(j.done.includes(id)){
                        status[count] = "done"
                    }
                    else if(j.notdone.includes(id)){
                        status[count]="not done";
                    }
                    else if(j.none.includes(id)){
                        status[count] ="none";
                    }
                    else{
                        status[count] = "none";
                    }
                    count++;
                    break;
                }
            }
            if(flag==1){
                status[count] = "none";
                count++;
            }
        }
        console.log(status);
        return res.render('habit',{
            status:status
        });
    });
    
});

router.get('/',function(req,res){
    return res.redirect('/day/0');
    let date = new Date();
    return updateHomeWithDate(date.getDate(),req,res);
});
