// firebase/firebaseSetup.js
const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Load your service account key JSON file
const serviceAccount = require("../file/realtyfocus-94962-firebase-adminsdk-fbsvc-58e31fd75f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "realtyfocus-94962.appspot.com", // Your exact bucket name
});

const bucket = getStorage().bucket();

console.log("Using bucket:", bucket.name);

const firebaseMulterHandler = async (fileBuffer, originalName, folder) => {
  const fileName = `${folder}/${Date.now()}-${uuidv4()}${path.extname(originalName)}`;
  const file = bucket.file(fileName);

  // Save file buffer to Firebase Storage
  await file.save(fileBuffer, {
    metadata: { contentType: "image/jpeg" }, // Adjust content type as needed
  });

  // Make the file publicly accessible
  await file.makePublic();

  // Construct public URL
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  return publicUrl;
};

module.exports = { firebaseMulterHandler };
