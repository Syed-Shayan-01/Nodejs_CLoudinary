const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary');
const env = require('dotenv').config()

const destination = path.join(process.cwd(), "public", "images");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destination)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });


router.post('/upload', upload.single('file'), (req, res) => {
    // try {
    //     fs.readdirSync(destination).forEach(file => {
    //         cloudinary.v2.uploader.upload(`${destination}/${file}`, {});
    //         console.log(result);
    //         res.status(200).json({ success: true, message: 'File uploaded to Cloudinary' });
    //     })
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
    // res.status(200).json({ success: true, message: 'File uploaded' });
});

module.exports = router;

