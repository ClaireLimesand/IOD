const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
// Cloudinary
// const cloudinary = require("cloudinary").v2;
const cloudinaryUpload = require('../modules/cloudinary-config');

router.put('/', rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
      // after the image uploads, we have access to req.file:
      console.log('neato! req.file:', req.file)
      const logoUrl = req.file.path;

      const sqlText =
      `
          UPDATE "internships" 
          SET "company_logo" = $1
          WHERE "id" = $2
      `
      const sqlValues = [
          logoUrl,
          req.user.id
      ];
  
      pool.query(sqlText, sqlValues)
       .then((dbres) => {
         res.sendStatus(201);
       })
       .catch((dberror) => {
         console.log('Oops you messed up DB error', dberror);
         res.sendStatus(500)
       })  
      // })
  });

module.exports = router;