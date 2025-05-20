const multer = require("multer");

// Use memory storage to upload directly to Firebase
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
