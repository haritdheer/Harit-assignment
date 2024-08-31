const express = require('express');
const multer = require('multer');
const { uploadCSV, checkStatus,getAllRequests } = require('../controllers/imagecontroller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/upload', upload.single('csvFile'), uploadCSV);
router.get('/status/:requestId', checkStatus);
router.get('/requests', getAllRequests);

module.exports = router;
