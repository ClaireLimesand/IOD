const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
    const sqlText = `
      SELECT * FROM "favorite-project";
    `;
      pool.query(sqlText)
      .then((dbRes) => {
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
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
      "image" = $3,
      "user_id" = $4
    WHERE "id" = $5;
    `;
  const sqlValues = [
    req.body.name,
    req.body.description,
    req.body.image,
    req.body.user_id,
    1,
  ];
  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      res.sendStatus(500);
    });
});

module.exports = router;
