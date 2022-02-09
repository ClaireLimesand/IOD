const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT "announcements"."message", "announcements"."id", "message_types"."title", "message_id" FROM "announcements"
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
    DELETE FROM "announcements" 
        WHERE "id"=$1;
    `;

    const sqlValues = [
        req.params.id
    ]

    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('DELETE announcement error', dbErr);
            res.sendStatus(500);
        })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    
    const sqlQuery =`INSERT INTO "announcements" ("message", "message_id")
        VALUES ($1, $2);`
    const sqlValues = [
        req.body.text,
        req.body.type
    ];
    
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST announcement error', dbErr);
            res.sendStatus(500);
        })
});

module.exports = router;