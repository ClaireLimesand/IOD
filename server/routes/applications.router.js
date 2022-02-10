const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
    } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        SELECT * FROM "applications"
        ORDER BY "id" ASC;
    `;

    pool.query(sqlQuery)
    .then((dbRes) => {
        res.send(dbRes.rows);
    })
    .catch((dbErr) => {
        console.log('Error: ', dbErr);
        res.sendStatus(500);
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        INSERT INTO "applications" ("company", "student_name")
        VALUES ($1, $2);
    `;
    const sqlValues = [
        req.body.company,
        req.body.name
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

router.put('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "applications"
        SET "new_notification" = false;
    `;
    pool.query(sqlText)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST friends error', dbErr);
            res.sendStatus(500);
        })
});

router.delete('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        DELETE FROM "applications" 
        WHERE "id"=$1;
    `;
    const sqlValues = [
        req.body.id
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

// Add admin
router.put('/add', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "user"
        SET "access_level" = 3
        WHERE "id" = $1;
    `;
    const sqlValues = [
        req.body.id
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

// Remove admin
router.put('/remove', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "user"
        SET "access_level" = 1
        WHERE "id" = $1;
    `;
    const sqlValues = [
        req.body.id
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
