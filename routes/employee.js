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

    let userDetails = new UserDetailsModel({
        exp: req.body.exp,
        skillSet: req.body.skillSet,
        location: req.body.location,
        noticePeriod: req.body.noticePeriod,
        salary: req.body.salary,
        isActivelyLookingforJob: req.body.isActivelyLookingforJob,
        empDetailsId: shortid.generate()
    })

    userDetails.save((err, result) => {
        if (err) {
            let response = {
                message: 'User job details created successfully',
                result: result,
                error: err
            }
            return response;
        } else {

            let response = {
                message: 'Unable to create userDetails',
                result: null,
                error: err
            }
            return response;
        }
    })
})


router.get('/get-emp-details', checkAuth, (req, res) => {

    UserDetailsModel.findOne({
        empDetailsId: req.params.id
    }).then(result => {
        let resObj
        if (result) {
            resObj = response.generate(false, 'Employee Details', 200, result)
            return resObj
        } else {
            resObj = response.generate(true, 'Unable to get Employee Details', 404, null)
            return resObj

        }
    })
})

module.exports = router;