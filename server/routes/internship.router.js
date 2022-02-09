const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const {
    isAdmin,
} = require('../modules/admin-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = 
    `
        SELECT 
            "internships"."id",
            "internships"."company_name",
            "internships"."company_subtitle",
            TO_CHAR("start_date",'MM-DD-YYYY') AS "start_date", 
            TO_CHAR("end_date",'MM-DD-YYYY') AS "end_date", 
            "internships"."company_logo",
            "internships"."company_description"
        FROM "internships" 
    `;

    pool.query(sqlText)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Oops you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});
// SELECT * FROM "internships"

router.post('/', rejectUnauthenticated, isAdmin, (req, res) => {
    const sqlQuery =`INSERT INTO "internships" ("company_name", "company_subtitle", "start_date", "end_date", "company_logo", "company_description")
        VALUES ($1, $2, $3, $4, $5, $6);`
    const sqlValues = [
        req.body.companyName,
        req.body.subtitle,
        req.body.startDate,
        req.body.endDate,
        req.user.logo,
        req.body.description
    ];
    
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST internship error', dbErr);
            res.sendStatus(500);
        })
});

router.delete('/:id', rejectUnauthenticated, isAdmin, (req, res) => {
    const sqlQuery = `
    DELETE FROM "internships" 
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
            console.error('DELETE internship error', dbErr);
            res.sendStatus(500);
        })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
        
    const sqlQuery = `
        SELECT * FROM "internships"
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

router.put('/:id', rejectUnauthenticated, isAdmin, (req, res) => {
    const sqlText = `
        UPDATE "internships"
            SET "company_name" = $1,
                "company_subtitle" = $2,
                "start_date" = $3,
                "end_date" = $4,
                "company_description" = $5,
                "company_logo" = $6
            WHERE id = $7;
    `;
    const sqlValues = [
        req.body.payload.name,
        req.body.payload.subtitle,
        req.body.payload.startDate,
        req.body.payload.endDate,
        req.body.payload.description,
        req.body.payload.logo,
        req.params.id
    ];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('PUT internship error', dbErr);
            res.sendStatus(500);
        })
});

module.exports = router;