const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require("path");

const storage = new Storage({
  keyFilename: path.join(__dirname, '..', 'file', 'email-js-1a09b-firebase-adminsdk-ensw9-ce43bbc98e.json'),
  projectId: 'email-js-1a09b',
});

const bucketName = 'email-js-1a09b.appspot.com';
const bucket = storage.bucket(bucketName);

// In-memory multer storage
const multerMemoryStorage = multer.memoryStorage();

// Use multer.fields() for named fields
const uploadFields = multer({
  storage: multerMemoryStorage,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4MB
  fileFilter: (req, file, cb) => {
    const isImage = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype);
    if (isImage) cb(null, true);
    else cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'));
  }
}).fields([
  { name: 'featured_image', maxCount: 1 },
  { name: 'masterplan_image', maxCount: 1 },
  { name: 'location_image', maxCount: 1 },
  { name: 'gallery_image', maxCount: 10 },
  { name: 'slider_image', maxCount: 10 },
  { name: 'adv_image', maxCount: 1 },
  { name: 'mlogo', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]);

const uploadHandler = (req, res, next) => {
  uploadFields(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ success: false, error: 'Multer error', details: err.message });
    }

    const folderType = req.body.folder;
    const allowedFolders = ['amenities', 'specification', 'builder', 'gallery', 'slider', 'microsite', 'floor_plan', 'bank_app', 'legal_app'];
    if (!allowedFolders.includes(folderType)) {
      return res.status(400).json({ error: 'Invalid folder type provided' });
    }

    req.uploadedUrls = {}; // { featured_image: [URL], gallery_image: [URL, ...] }

    try {
      const uploadPromises = [];

      for (const fieldName in req.files) {
        const files = req.files[fieldName];

        for (const file of files) {
          const newFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
          const destination = `realtfocus/${folderType}/${newFileName}`;

          const fileStream = bucket.file(destination).createWriteStream({
            metadata: { contentType: file.mimetype }
          });

          const uploadPromise = new Promise((resolve, reject) => {
            fileStream.on('error', reject);
            fileStream.on('finish', () => {
              const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;
              if (!req.uploadedUrls[fieldName]) req.uploadedUrls[fieldName] = [];
              req.uploadedUrls[fieldName].push(publicUrl);
              resolve();
            });
            fileStream.end(file.buffer);
          });

          uploadPromises.push(uploadPromise);
        }
      }

      await Promise.all(uploadPromises);
      console.log('All files uploaded successfully.');
      next();
    } catch (uploadError) {
      console.error('File upload error:', uploadError);
      res.status(500).json({ error: 'File upload to Google Cloud failed', details: uploadError.message });
    }
  });
};

module.exports = { uploadHandler };


/*

// Image/multerSetup.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadHandler = (folderName) => {
  const destPath = path.join(__dirname, '..', 'uploads', folderName);

  // Create folder if not exists
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destPath);
    },
    filename: function (req, file, cb) {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });

  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg, .jpeg, .png formats allowed!"));
      }
    }
  });

  return upload.single('image'); // expected field name
};

module.exports = { uploadHandler };

*/