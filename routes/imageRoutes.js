const express = require('express');
const multer = require('multer');
const { uploadCSV, checkStatus } = require('../controllers/imagecontroller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/upload', upload.single('csvFile'), uploadCSV);
router.get('/status/:requestId', checkStatus);

module.exports = router;
