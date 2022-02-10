const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `
      SELECT
        "projects"."id",
        "projects"."project_name",
        "projects"."description",
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
  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      console.log(
        `All the projects for user_id ${req.user.id} ==>`,
        dbRes.rows
      );

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
      };
      // array of project objects
      const transformedProjectData = splitProjects(dbRes.rows);
      console.log("This split array", splitProjects(dbRes.rows));

      res.send(transformedProjectData);
    })
    .catch((dbErr) => {
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    INSERT INTO "projects" ("project_name", "description", "image", "user_id", "internship_id")
    VALUES
    ($1, $2, $3, $4, $5);
    `;
  const sqlValues = [
    req.body.title,
    req.body.description,
    req.body.image,
    req.user.id,
    req.body.internship_id,
  ];
  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
    DELETE FROM "projects" 
        WHERE "id"=$1;
    `;
  const sqlValues = [req.params.id];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error("DELETE projects error", dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;
