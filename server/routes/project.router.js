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

router.put('/:id', rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
      // after the image uploads, we have access to req.file:
      console.log('nifty! req.file:', req.file)
      const pictureUrl = req.file.path;

      const sqlText =
      `
          UPDATE "projects" 
          SET "image" = $1
          WHERE "id" = $2
      `
      const sqlValues = [
          pictureUrl,
          req.params.id
      ];
  
      pool.query(sqlText, sqlValues)
       .then((dbres) => {
         res.sendStatus(201);
       })
       .catch((dberror) => {
         console.log('Oops you messed up DB error', dberror);
         res.sendStatus(500)
       })
  });

  router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        SELECT * FROM "projects"
        ORDER BY "id" DESC
        LIMIT 1;
    `;

    pool.query(sqlQuery)
    .then((dbRes) => {
        res.send(dbRes.rows[0]);
    })
    .catch((dbErr) => {
        console.log(dbErr);
        res.sendStatus(500);
    })
});

module.exports = router;