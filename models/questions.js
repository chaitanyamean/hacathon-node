const mongoose = require('mongoose')

const Schema = mongoose.Schema

let questions = new Schema({

    question: {
        type: String
    },
    skill: {
        type: String
    },
    skillId: {
        type: String
    },
    answers:{
        type: Array
    },
    correctAnswer: {
        type: String
    }
})

mongoose.model('Questions', questions)