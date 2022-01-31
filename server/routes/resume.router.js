const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'DEV',
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    console.log('working');
    return res.json({ message: "Hello World 🇵🇹 🙌" });
});

router.post("/", upload.single("picture"), async (req, res) => {
    return res.json({ picture: req.file.path });
});

module.exports = router;