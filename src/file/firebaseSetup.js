// firebase/firebaseSetup.js
const admin = require('firebase-admin');
const serviceAccount = require('./realtyfocus-94962-firebase-adminsdk-fbsvc-58e31fd75f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "realtyfocus-94962.appspot.com", // ✅ match this
});


const bucket = admin.storage().bucket();

// Multer middleware for handling file uploads to Firebase Storage
const firebaseMulterHandler = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const uploadPromises = req.files.map((file) => {
    const blob = bucket.file(file.filename);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        req.fileUrls = req.fileUrls || [];
        req.fileUrls.push(publicUrl);
        resolve();
      });

      blobStream.on('error', (error) => {
        reject(`Unable to upload file: ${error}`);
      });

      blobStream.end(file.buffer);
    });
  });

  Promise.all(uploadPromises)
    .then(() => next())
    .catch((error) => res.status(500).json({ error }));
};

module.exports = { firebaseMulterHandler };
