const mongoose = require('mongoose');

const imageRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  productData: [
    {
      serialNumber: Number,
      productName: String,
      inputImageUrls: [String],
      outputImageUrls: [String]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('ImageRequest', imageRequestSchema);
