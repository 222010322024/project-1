const asyncHandler = require('express-async-handler');
const Image = require('../models/Image');
const { cloudinary } = require('../utils/cloudinaryConfig');
const httpStatus = require('http-status');
const {
  callPythonFunctionImageClassification,
  callPythonFunctionOCRClassification,
  callPythonFunctionLocationClassification,
  callPythonFunctionLocationService,
} = require('../utils/callPythonFunction');
const {
  extractResult,
  extractTextFromOCRResult,
} = require('../utils/extractResult');
const _ = require('lodash');
const fs = require('fs');

module.exports = {
  uploadImage: asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(httpStatus.BAD_REQUEST).json({
        status: 'fail',
        msg: 'A valid JPG image file is required. Please upload a JPG file.',
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(req.file.path);
    const data = await callPythonFunctionImageClassification(req.file.path);
    const objectType = extractResult(data);

    const OCRText = await callPythonFunctionOCRClassification(req.file.path);
    const OCRResult = extractTextFromOCRResult(OCRText);

    const location = await callPythonFunctionLocationClassification(
      req.file.path,
    );

    const service = await callPythonFunctionLocationService(req.file.path);

    await fs.unlinkSync(req.file.path);

    const image = await Image.create({
      imgUrl: secure_url,
      objectType,
      result: OCRResult || '-',
      location: location || '-',
      service: service || '-',
    });

    return res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        image,
      },
    });
  }),
  getAllImages: asyncHandler(async (req, res) => {
    const { objectType } = req.query;
    let filter = {};

    if (objectType) {
      filter.objectType = objectType;
    }

    const images = await Image.find(filter).sort({ createdAt: -1 });

    res.status(httpStatus.OK).json({
      status: 'success',
      result: images.length,
      data: {
        images,
      },
    });
  }),
  updateImage: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { objectType, location, services, result } = req.body;

    const validObjectTypes = ['Vehicles', 'Card', 'Sign', 'Construction Site'];

    if (!_.includes(validObjectTypes, objectType)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: 'fail',
        msg: 'Invalid "objectType". Valid values are: Vehicles, Card, Sign, Construction Site.',
      });
    }

    const image = await Image.findByIdAndUpdate(
      id,
      {
        objectType,
        location,
        services,
        result,
      },
      {
        new: true,
      },
    );

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        image,
      },
    });
  }),
  changeReviewStatus: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isReviewed } = req.body;
    const image = await Image.findByIdAndUpdate(id, {
      isReviewed,
    });
    console.log(isReviewed, image);
    res.status(httpStatus.OK).json({
      status: 'success',
      msg: 'Image updated successfully',
      data: image,
    });
  }),
  deleteImage: asyncHandler(async (req, res) => {
    const { id } = req.params;

    await Image.findByIdAndDelete(id);

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      msg: 'Image deleted successfully.',
    });
  }),
};
