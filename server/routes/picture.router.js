const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
// Cloudinary
const cloudinary = require("cloudinary").v2;
console.log(cloudinary.config().cloud_name);

router.put('/', rejectUnauthenticated, (req, res) => {
    const sqlText =
    `
        UPDATE "students" 
        SET "picture" = images/$2
        WHERE "user_id" = $1
    `
    const sqlValues = [
        req.user.id,
        req.body.picture
    ];

     pool.query(sqlText, sqlValues)
      .then((dbres) => {
          res.sendStatus(201);
          
          cloudinary.uploader
            .upload(`./public/images/profile_pic.jpeg`, {
                resource_type: "image",
            })
            .then((result) => {
                console.log('success', JSON.stringify(result, null, 2));
            })
            .catch((error) => {
                console.log('error', JSON.stringify(error, null, 2));
            });
        })
      .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
      })   
    // endpoint functionality
  });

module.exports = router;