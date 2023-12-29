const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../', 'uploads'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const uniqueFilename = `${timestamp}${extension}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = { upload };
