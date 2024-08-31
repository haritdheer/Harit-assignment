const ImageRequest = require('../models/imageRequest');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');

const uploadCSV = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Please upload a CSV file.' });
    }

    
    const parsedData = parseCSV(file.path);
    if (!parsedData) {
      return res.status(400).json({ message: 'Invalid CSV format.' });
    }

    const requestId = uuidv4();

    const newRequest = new ImageRequest({
      requestId,
      productData: parsedData,
    });
    await newRequest.save();

   
    processImagesAsync(requestId);

    res.status(200).json({ requestId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const checkStatus = async (req, res) => {
  const { requestId } = req.params;
  try {
    const request = await ImageRequest.findOne({ requestId });
    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }
    res.status(200).json({ status: request.status, productData: request.productData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};


const parseCSV = (filePath) => {
  
  return [
    { serialNumber: 1, productName: 'SKU1', inputImageUrls: ['https://example.com/img1.jpg'] },
    
  ];
};

module.exports = { uploadCSV, checkStatus };
