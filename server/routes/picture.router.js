const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
// Cloudinary
const cloudinary = require("cloudinary").v2;

router.put('/', rejectUnauthenticated, (req, res) => {
    let pictureUrl;

    cloudinary.uploader
      .upload('./public/images/profile_pic.jpeg', {
          resource_type: "image",
      })
      .then((result) => {
          console.log('success', JSON.stringify(result, null, 2));
          pictureUrl = result.url;
          console.log('URL!!!', pictureUrl);
      })
      .catch((error) => {
          console.log('error', JSON.stringify(error, null, 2));
      })
      .then(() => {
        const sqlText =
        `
            UPDATE "students" 
            SET "picture" = $1
            WHERE "user_id" = $2
        `
        const sqlValues = [
            pictureUrl,
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
      })
  });

module.exports = router;