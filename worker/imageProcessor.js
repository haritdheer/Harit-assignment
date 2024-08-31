const ImageRequest = require('../models/imageRequest');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');

const processImagesAsync = async (requestId) => {
  try {
    const request = await ImageRequest.findOne({ requestId });
    if (!request) return;

    request.status = 'in_progress';
    await request.save();

    for (let product of request.productData) {
      let outputUrls = [];
      for (let url of product.inputImageUrls) {
        const compressedImageUrl = await downloadAndCompressImage(url);
        outputUrls.push(compressedImageUrl);
      }
      product.outputImageUrls = outputUrls;
    }

    request.status = 'completed';
    await request.save();
  } catch (error) {
    console.error('Error in processing images:', error);
  }
};

const downloadAndCompressImage = async (imageUrl) => {
  const response = await axios({ url: imageUrl, responseType: 'arraybuffer' });
  const outputPath = `output/${Date.now()}-compressed.jpg`;

  await sharp(response.data)
    .jpeg({ quality: 50 })
    .toFile(outputPath);

  return outputPath; 
};

module.exports = { processImagesAsync };
