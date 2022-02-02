const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT * FROM "students"
        WHERE "user_id" = $1;
    `;
    const sqlValues = [req.user.id];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('Data', dbRes.rows);
            
            res.send(dbRes.rows);
        })
        .catch((dbErr) => {
            res.sendStatus(500);
        })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        INSERT INTO "students" ("email", "pronouns", "name", "picture", "banner", "about", "linkedin", "user_id")
        VALUES (NULL, NULL, $1, NULL, 'images/banner.jpeg', NULL, NULL, $2);
    `;
    const sqlValues = [
        req.user.username,
        req.user.id
    ];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST friends error', dbErr);
            res.sendStatus(500);
        })
});

module.exports = router;