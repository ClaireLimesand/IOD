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

// POST for a user to add a skill
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in POST skills server', req.user);
    const newSkill = req.body;

    const sqlQuery = `
    INSERT INTO "skills" ("skill", "user_id")
    VALUES ($1, $2)
`;
    const sqlValues = [
        newSkill.skill,
        req.user.id
    ]
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST friends error', dbErr);
            res.sendStatus(500);
        })
});

module.exports = router;
