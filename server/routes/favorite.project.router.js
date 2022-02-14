const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
    const sqlText = `
      SELECT * FROM "favorite-project"
      WHERE "user_id" = $1;
    `;
    const sqlValues = [
      req.user.id
    ];
      pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
        console.log(dbErr);
        res.sendStatus(500);
      });
  });

router.put("/", rejectUnauthenticated, (req, res) => {
  console.log('req.body for favorite project', req.body);
  const sqlText = `
    UPDATE "favorite-project"
    SET
      "project_name" = $1,
      "description" = $2,
      "image" = $3
    WHERE "user_id" = $4;
    `;
  const sqlValues = [
    req.body.name,
    req.body.description,
    req.body.image,
    req.user.id
  ];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    INSERT INTO "favorite-project" ("project_name", "description", "user_id")
    VALUES (NULL, NULL, $1);
  `;
  const sqlValues = [
    req.user.id
  ];
  
  pool.query(sqlText, sqlValues)
      .then((dbRes) => {
          res.sendStatus(201);
      })
      .catch((dbErr) => {
          console.error('POST skills error', dbErr);
          res.sendStatus(500);
      })
});

module.exports = router;
