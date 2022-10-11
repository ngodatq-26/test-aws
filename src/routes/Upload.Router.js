const express = require('express');
const router = express.Router();

const UploadController = require('../controllers/Upload.Controller');

router.post('', UploadController.uploadV3);

module.exports = router;