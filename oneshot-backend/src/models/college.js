const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    year_founded:{
        type: Number,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    no_of_students:{
        type: Number,
        required: true
    },
    courses:[String]
})

const College = mongoose.model('College', collegeSchema)

module.exports = College