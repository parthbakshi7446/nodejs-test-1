const mongoose  = require('mongoose');

let historySchema = new mongoose.Schema({
    date:{
        type:Number,
        required:true
    },
    done:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Habit'
        }
    ],
    notdone:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Habit'
        }
    ],
    none:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Habit'
        }
    ]
},{
    timestamps:true
});

const History = mongoose.model('History',historySchema);

module.exports = History;