const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    imgUrl: {
      type: String,
    },
    objectType: {
      type: String,
      enum: ['Vehicles', 'Card', 'Construction Site', 'Sign'],
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
    result: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
