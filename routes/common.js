const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const shortid = require('shortid')

const model = require('../models/user')
const UserModel = mongoose.model('User')

const response = require('../libs/responseLibs')

router.get('/', (req, res) => {
    res.send('this is router express')
})


router.get('/getAllUsers', (req, res) => {
    UserModel.find({isUser: true}).then(result => {

        return res.send(result)
    })
})
