const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')

const router = express.Router()

const model = require('../models/user')
const UserModel = mongoose.model('User')

const jobtags = require('../models/tag')
const AddJobsModel = mongoose.model('Jobtags')

const checkAuth = require('../middlewares/check-auth')


const response = require('../libs/responseLibs')


router.get('/getAllUsers',checkAuth, (req, res) => {
    let resObj
    UserModel.find({isUser: true}).then(result => {

        resObj = response.generate(false, 'All users', 200, result)
        res.send(resObj)
    })
})

router.post('/addJobTags', (req, res) => {

    let jobTags = new AddJobsModel({
        itemId: shortid.generate(),
        tags: req.body.tags
    })
    // console.log('Request', req);
    jobTags.save((err, result) => {
    let resObj

        if(err) {

            let resObj = {
                message: 'Unable to add Jobs',
                status: 404,
                error: null,
                token: null,
                result: null
            }
            resObj = response.generate(true, 'Unable to add tags', 404, result)
            res.send(resObj)
        } 
        resObj = response.generate(false, 'Added tags', 200, result)
        res.send(resObj)
    })
})

router.get('/getAllTags', checkAuth,(req, res) => {

    AddJobsModel.find().then(result => {  
    let resObj
      if(result) {
        resObj = response.generate(true, 'All tags', 200, result)
        res.send(resObj)
      }
      resObj = response.generate(true, 'Unable to fetch tags', 404, result)
        res.send(resObj)

    })
})

module.exports = router;