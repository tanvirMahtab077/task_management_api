const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true,
    },
    due_date:{
        type:String,
        required:true,
    },
    status: {
        type: String,
        enum : ['in progress','completed','pending'],
        default: 'in progress'
    },   
})

module.exports = mongoose.model('Task', taskSchema)