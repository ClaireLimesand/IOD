const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
// Cloudinary
const cloudinary = require("cloudinary").v2;
const cloudinaryUpload = require('../modules/cloudinary-config');

// Allows students to set their resume on their profile
router.put('/', rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
      // after the image uploads, we have access to req.file:
      console.log('nifty! req.file:', req.file)
      const resumeUrl = req.file.path;

      const sqlText =
      `
          UPDATE "students" 
          SET "resume" = $1
          WHERE "user_id" = $2
      `
      const sqlValues = [
          resumeUrl,
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
  });

  // gets the profile to display on the students page
  router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = 
    `
        SELECT "resume" FROM "students"
        WHERE user_id = $1;
    `;
    const sqlValues = [
        req.user.id
    ];

    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows[0]))
        .catch((dberror) => {
        console.log('Oops you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

// gets the specific resume for a student
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = 
  `
    SELECT "resume", "user"."id" FROM "user"
    JOIN "students"
    ON "user"."id" = "students"."user_id"
    WHERE "students"."id" = $1;  
  `;
  const sqlValues = [
      req.params.id
  ];

  pool.query(sqlText, sqlValues)
      .then((dbres) => res.send(dbres.rows[0]))
      .catch((dberror) => {
      console.log('Oops you messed up DB error', dberror);
      res.sendStatus(500)
  })  
});

module.exports = router;