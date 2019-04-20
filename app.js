console.log('hello world');

const fs = require('fs') // Internal Module
const os = require('os')
const path = require("path");

const appConfig = require('./config/appconfig')
const userRoutes = require('./routes/users')
const empRoutes = require('./routes/employee')



// External Module
const mongoose = require('mongoose')
const express = require('express') 
const bodyparser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000
const dburl = process.env.MONGODB_URL || appConfig.db.url
// const dburl = appConfig.db.url

// body parser for post methods
 app.use(bodyparser.json())
 app.use(bodyparser.urlencoded({extended: false}))

 let modelsPath = './models'
 
 fs.readdirSync(modelsPath).forEach(function (file) {
    console.log(modelsPath + '/' + file)
     if(~file.indexOf('.js')) require(modelsPath + '/' + file)
    })
    

    app.use((req,res,next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE")

        next();
    })
    
   
                        
app.use('/user', userRoutes)
app.use('/employee', empRoutes)


app.listen(port, () => {
    let db = mongoose.connect(dburl, ({ useNewUrlParser: true, uri_decode_auth: true }))
    console.log('Port is running in ' + port)
    console.log(dburl);
})


mongoose.connection.on('error', function(err) {
    if(err) {
        console.log(err)
    }
})

mongoose.connection.on('open', function(err) {
    if(err) {
        console.log(err)

    } else {
        console.log('connection successful')
    }
})

