const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT * FROM "projects"
        WHERE "user_id" = $1 AND "internship_id" = $2;
    `;
    const sqlValues = [req.user.id, 1];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('Portfolio', dbRes.rows);
            
            res.send(dbRes.rows);
        })
        .catch((dbErr) => {
            res.sendStatus(500);
        })
});

module.exports = router;