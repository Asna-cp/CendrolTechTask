const multer = require("multer");

const profilePictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profilepicture");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const profilePictureUpload = multer({ storage: profilePictureStorage });

module.exports = profilePictureUpload;
