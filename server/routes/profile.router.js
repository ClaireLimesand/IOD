const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// grabs all data about the student for student page
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT "email", "pronouns", "name", "picture", "banner", "cohort", "about", "linkedin", "resume", "user_id", "access_level" FROM "students"
        JOIN "user"
        ON "students"."user_id" = "user"."id"
        WHERE "user_id" = $1;
    `;
    const sqlValues = [req.user.id];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('Data', dbRes.rows);
            
            res.send(dbRes.rows);
        })
        .catch((dbErr) => {
            console.log(dbErr);
            res.sendStatus(500);
        })
});

// allows student to create new about info
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

// allows students to edit about section on student profile
router.put('/about', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "students"
        SET "about" = $1
        WHERE id = $2;
    `;
    const sqlValues = [
        req.body.text,
        req.user.id
    ];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('PUT skills error', dbErr);
            res.sendStatus(500);
        })
});

// allows students to edit name, email, linkedin, and pronouns
router.put('/top', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "students"
        SET "name" = $1, "email" = $2, "linkedin" = $3, "pronouns" = $4
        WHERE "user_id" = $5;
    `;
    const sqlValues = [
        req.body.name,
        req.body.email,
        req.body.linkedin,
        req.body.pronouns,
        req.user.id
    ];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('PUT skills error', dbErr);
            res.sendStatus(500);
        })
});

// Creating a GET that will load a specific student's profile
router.get('/:id', (req, res) => {
    const sqlText = `
    SELECT * FROM "students"
    WHERE "students"."id"=$1;
    `;
    pool.query(sqlText, [req.params.id])
        .then((dbRes) => {
            res.send(dbRes.rows);
        }).catch(err => {
            console.log('ERROR: GET student by id', err);
            res.sendStatus(500);
        })
        
});


module.exports = router;