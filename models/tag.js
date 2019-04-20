const mongoose = require('mongoose')

const Schema = mongoose.Schema


let jobtags = new Schema({

    itemId: {
        type: String
    },
    tags: {
        type: String
    }
})

mongoose.model('Jobtags', jobtags)