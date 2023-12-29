const express = require('express');
const {
  getAllImages,
  uploadImage,
  updateImage,
  deleteImage,
  changeReviewStatus,
} = require('../controllers/Image');
const { upload } = require('../utils/multerConfig');
const router = express.Router();

router.route('/').get(getAllImages).post(upload.single('image'), uploadImage);
router.route('/:id').put(updateImage).delete(deleteImage);
router.route('/changeReview/:id').patch(changeReviewStatus);

module.exports = router;
