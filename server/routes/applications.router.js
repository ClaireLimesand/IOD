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

module.exports = router;
