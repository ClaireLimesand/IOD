const express = require('express');
const {
rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT * FROM "students";
    `;

    pool.query(sqlText)
        .then((dbRes) => {
            console.log('Data', dbRes.rows);
            res.send(dbRes.rows);
        })
        .catch((dbErr) => {
            console.log('dbErr', dbErr)
            res.sendStatus(500);
        })
});



module.exports = router;