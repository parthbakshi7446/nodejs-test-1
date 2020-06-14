const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    from:{//specifies the start date of the habit
        type:Number
    },
    totaldays:{//total number of days when completed
        type:Number
    }
},{
    timestamps:true
});

const Habit = mongoose.model('Habit',habitSchema);

module.exports = Habit;