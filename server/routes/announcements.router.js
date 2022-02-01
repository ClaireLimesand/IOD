const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT "announcements"."message", "message_types"."title" FROM "announcements"
        JOIN "message_types"
        ON "announcements"."message_id" = "message_types"."id";
    `;
    pool.query(sqlText)
        .then((dbRes) => {
            console.log('announcements', dbRes.rows);
            
            res.send(dbRes.rows);
        })
        .catch((dbErr) => {
            res.sendStatus(500);
        })
});

module.exports = router;