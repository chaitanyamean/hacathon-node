// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let empDetails = new Schema({

    exp: {
        type: Number,
    },
    skillSet: {
        type: Array
    },
    location: {
        type: String
    },
    noticePeriod: {
        type: Number
    },
    salary: {
        type: String
    },
    isActivelyLookingforJob: {
        type: Boolean
    },
    empDetailsId: {
        type: String
    }

})

mongoose.model('EmployeeDetails', empDetails)

