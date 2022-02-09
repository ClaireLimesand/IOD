const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
    } = require('../modules/authentication-middleware');

// GET for a user's skills
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        SELECT * FROM "skills"
        WHERE "user_id"=$1
        ORDER BY "id" ASC;
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
            console.error('POST skills error', dbErr);
            res.sendStatus(500);
        })
});

// DELETE for a user's skills 
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
    DELETE FROM "skills" 
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
            console.error('DELETE skill error', dbErr);
            res.sendStatus(500);
        })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
        
    const sqlQuery = `
        SELECT * FROM "skills"
            WHERE id=$1
    `;
    const SqlValues = [
        req.params.id
    ];
    pool.query(sqlQuery, SqlValues)
    .then((dbRes) => {
        res.send(dbRes.rows[0]);
    })
    .catch((dbErr) => {
        res.sendStatus(500);
    })
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE skills
        SET skill = $1
        WHERE id = $2;
    `;
    const sqlValues = [
        req.body.skill,
        req.params.id
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

module.exports = router;
