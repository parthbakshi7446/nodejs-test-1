
const Habit = require('../models/habit');
const History = require('../models/history');


// detail show of a habit for the previous 7 days
module.exports.habitShowId = function(req,res){
    // console.log(req.params.id);
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
                        status[count] = "COMPLETE"
                    }
                    else if(j.notdone.includes(id)){
                        status[count] = "INCOMPLETE";
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
        Habit.findById(id,function(err,habit){
            if(err){console.log("error fetching habit in habit display");return;}
            return res.render('habit',{
                status:status,
                name:habit.name
            });
        });
        
    });
    
};


//search all the habits for a respective date
module.exports.habitForDate = function(req,res){
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
                
            }
            else if(+done==2){
                if(!history.notdone){
                    history.notdone = new Array();
                }
                history.notdone.push(id);
                
            }
            else if(+done==0){
                if(!history.none){
                    history.none = new Array();
                }
                history.none.push(id);
                
            }
            else{
                console.log("issue in finding apt done value");
            }
            history.save();
            return res.redirect('back');
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
                return res.redirect('back');
            });

        }
    });
};

module.exports.newHabit = function(req,res){
    console.log(req.body.from);
    if(new Date(req.body.from).getDate()>new Date().getDate()){
        console.log("future habit set");
    }
    Habit.create({
        name:req.body.name,
        from:parseInt(new Date(req.body.from).getDate() || new Date().getDate(),10)
    },function(err,habit){
        if(err){
            console.log(err);
            return res.redirect('/');
        }
    });
    return res.redirect('back');
};