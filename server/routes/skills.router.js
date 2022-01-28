const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
    } = require('../modules/authentication-middleware');

// GET for a user's skills

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in GET skills server', req.user);
    
    const sqlQuery = `
        SELECT * FROM "skills"
        WHERE "user_id"=$1
        ORDER BY "skill" ASC;
    `;
    const sqlValues = [req.user.id];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.send(dbRes.rows);
    })
    .catch((dbErr) => {
        res.sendStatus(500);
    })
});

module.exports = router;
