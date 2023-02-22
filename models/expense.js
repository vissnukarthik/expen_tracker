const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema({
    name: {
        type:String,
        trim:true,
        required:[true,"pls add some txt"]
    },
    amount: {
        type:Number,
        required:[true,"pls pos number"]
    },
    desc: {
        type:String,
    }
});

module.exports  = mongoose.model('Expenses',ExpensesSchema)