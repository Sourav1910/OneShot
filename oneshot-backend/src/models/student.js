const mongoose = require('mongoose')
const College = require('./college')

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    year_of_batch:{
        type: Number,
        required: true
    },
    college_id:{
        type: Number,
        required: true
    },
    skills:[String]
})


const Student = mongoose.model('Student', studentSchema)

module.exports = Student