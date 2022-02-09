const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
    } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        SELECT * FROM "applications"
        WHERE "user_id"=$1
    `;
    const sqlValues = [
        req.user.id
    ];

    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.send(dbRes.rows);
    })
    .catch((dbErr) => {
        res.sendStatus(500);
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        INSERT INTO "applications" ("company", "student_name", "user_id")
        VALUES ($1, $2, $3);
    `;
    const sqlValues = [
        req.body.company,
        req.body.name,
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
