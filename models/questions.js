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
        type: String
    },
    correctAnswer: {
        type: Array
    }
})

mongoose.model('Questions', questions)