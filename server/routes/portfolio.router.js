const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
      SELECT
        "projects"."id",
        "projects"."project_name",
        "projects"."description",
        "projects"."image",
        "projects"."internship_id",
        "internships"."company_name",
        "internships"."company_subtitle",
        "internships"."company_logo"
      FROM "projects"
        JOIN "internships"
          ON "projects"."internship_id" = "internships"."id"
      WHERE "projects"."user_id" = $1;
    `;
    const sqlValues = [req.user.id];
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        console.log(`All the projects for user_id ${req.user.id} ==>`, dbRes.rows);
        
        // Transform dbRes.rows array to be an object where each
        // key corresponds to a given internship, and each key's value is an
        const splitProjects = (projects) => {
            let grouped = {};
            for (let project of projects) {
                if (!grouped[project.internship_id]) {
                    grouped[project.internship_id] = [];
                }
                grouped[project.internship_id].push(project);
            }
            return grouped;
        }
        // array of project objects
        const transformedProjectData = splitProjects(dbRes.rows);
        console.log('This split array', splitProjects(dbRes.rows));
        
  
        res.send(transformedProjectData);
    })
      .catch((dbErr) => {
        res.sendStatus(500);
      })
  });

module.exports = router;