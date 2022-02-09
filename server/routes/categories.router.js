const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
      SELECT * FROM "message_types"
    `;
    pool.query(sqlText)
    .then((dbRes) => {
        res.send(dbRes.rows);
    }).catch((dbErr) => {
        console.log('error in get categories', dbErr);
        res.sendStatus(500);
    })
})

module.exports = router;