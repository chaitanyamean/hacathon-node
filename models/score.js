const mongoose = require('mongoose')

const Schema = mongoose.Schema

let score = new Schema({

    score: {
        type: Number
    },
    skill: {
        type: String
    },
    skillId: {
        type: String
    },
    userId:{
        type: String
    }
})

mongoose.model('Score', score)