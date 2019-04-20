console.log('hello world');

const fs = require('fs') // Internal Module
const os = require('os')
const path = require("path");

const appConfig = require('./config/appConfig')
const userRoutes = require('./routes/users')


// External Module
const mongoose = require('mongoose')
const express = require('express') 
const bodyparser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000

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

app.listen(port, () => {
 
    let db = mongoose.connect(appConfig.db.url, ({ useNewUrlParser: true }))
    console.log('Port is running in ' + port)
    console.log(appConfig.db.url);
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

