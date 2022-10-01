const multer = require("multer");

// Type of images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Where the  file will be store (Disk)
const storage = multer.diskStorage({
  // to images folder
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // What filename to use
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
