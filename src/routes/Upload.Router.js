const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/resources/uploads/files');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage : storage });

const UploadController = require('../controllers/Upload.Controller');

router.post('/image', upload.single('image'), UploadController.uploadStorage);

module.exports = router;