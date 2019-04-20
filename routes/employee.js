const express = require('express')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const router = express.Router()

const model = require('../models/userDetails')
const UserDetailsModel = mongoose.model('EmployeeDetails')

const checkAuth = require('../middlewares/check-auth')

const response = require('../libs/responseLibs')

router.post('/emp-details', checkAuth, (req, res) => {

    console.log(req.body);
    let empDetails = new UserDetailsModel({
        exp: req.body.exp,
        skillSet: req.body.skillSet,
        location: req.body.location,
        noticePeriod: req.body.noticePeriod,
        salary: req.body.salary,
        isActivelyLookingforJob: req.body.isActivelyLookingforJob,
        empDetailsId: shortid.generate(),
        userId: req.body.userId
    })

    empDetails.save((err, result) => {
        let resObj
        if (result) {
            resObj = response.generate(false, 'User job details created successfully', 200, result)
            res.send(resObj)
        } else {
            resObj = response.generate(true, 'Unable to create Emp Details', 404, null)
            res.send(resObj)
        }
    })
})


router.get('/get-emp-details/:id', checkAuth, (req, res) => {

    console.log('params', req.params.id)
    UserDetailsModel.findOne({
        userId: req.params.id
    }).then(result => {
        let resObj
        if (result) {
            resObj = response.generate(false, 'Employee Details', 200, result)
            res.send(resObj)
        } else {
            resObj = response.generate(true, 'Unable to get Employee Details', 404, null)
            res.send(resObj)
        }
    })
})

router.put('update-emp-detials', (req, res) => {

    let options = req.body

    UserDetailsModel.findOneAndUpdate({userId: req.body.userId}, options).then(result => {
        let resObj
        if (result) {
            resObj = response.generate(false, 'Updated Employee Details', 200, result)
            res.send(resObj)
        } else {
            resObj = response.generate(true, 'Unable to update Employee Details', 404, result)
            res.send(resObj)
        }
    })

})

module.exports = router;