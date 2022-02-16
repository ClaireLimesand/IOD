const express = require('express');
const {
rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// gets data for students
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT "email", "pronouns", "name", "picture", "banner", "cohort", "about", "linkedin", "resume", "user_id", "access_level" FROM "students"
        JOIN "user"
        ON "students"."user_id" = "user"."id";
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

// gets data for admin
router.get('/admin', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT "user"."id", "name", "access_level" FROM "students"
        JOIN "user"
        ON "students"."user_id" = "user"."id"
        ORDER BY "id" ASC;
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

// gets data to view other students
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT * FROM "students"
        WHERE id = $1;
    `;
    const sqlValues = [
        req.params.id
    ];

    pool.query(sqlText, sqlValues)
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