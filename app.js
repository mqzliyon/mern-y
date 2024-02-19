const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

//Security Middleware
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Database
const mongo = require('mongoose');

//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp(undefined));
app.use(xss());

//BodyParser
app.use(bodyParser.json());

//Rate Limiter Implement
const limiter = rateLimiter({windowMs:15*60*100,max:3000});
// app.use(limiter());

//Database Connection


//Managing Backend Routing Setup
app.use(express.static('./client/build'))
app.get("*",(req, res)=>{
    req.sendfile(path.resolve(__dirname,'client','build','index.html'))
})

//Managing Frontend Routing Setup
app.use('/api/v1',router);


// Undefined Route Setup
app.use('*',(req, res)=>{
    res.status(404);
})
module.exports = app;
