const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const router = require('./routes/auth');
const indexRouter = require('./routes/index')
const mongoose = require('./db/connect');
const multer = require('multer')
const env = require('dotenv').config()
const verifyToken = require('./middlewares/verify');
const cloudinary = require('cloudinary');
const upload = require('./routes/upload')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.json());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});

app.use('',  indexRouter)
app.use('/file', upload)
app.use('/auth', router);
app.listen(process.env.PORT);