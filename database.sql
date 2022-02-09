
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Create a database called "iod"

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (120) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" TEXT
);

CREATE TABLE "internships" (
	"id" SERIAL PRIMARY KEY,
	"company_name" VARCHAR(255),
	"company_subtitle" TEXT,
	"start_date" DATE,
	"end_date" DATE,
	"company_logo" TEXT,
	"company_description" TEXT
);

CREATE TABLE "message_types" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(80)
);

CREATE TABLE "announcements" (
	"id" SERIAL PRIMARY KEY,
	"message" TEXT,
	"message_id" INT REFERENCES "message_types" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "students" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(255),
	"pronouns" VARCHAR(50),
	"name" VARCHAR(255),
	"picture" TEXT,
	"banner" TEXT,
	"about" TEXT,
	"linkedin" TEXT,
	"user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "users_internships" (
	"id" SERIAL PRIMARY KEY,
	"start_date" DATE,
	"end_date" DATE,
	"user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
	"internship_id" INT REFERENCES "internships" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"project_name" VARCHAR(100),
	"description" VARCHAR(255),
	"image" TEXT,
	"user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
	"internship_id" INT REFERENCES "internships" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "skills" (
	"id" SERIAL PRIMARY KEY,
	"skill" TEXT,
	"user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "applications" (
    "id" SERIAL PRIMARY KEY,
    "company" TEXT,
	"student_name" TEXT,
    "user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE
);


-- test data

INSERT INTO "internships" ("id", "company_name", "start_date", "end_date", "company_logo", "company_subtitle", "company_description") 
VALUES ('1', '3M', '2022-06-24', '2022-08-24', '3m_logo.png', 'Design Research and Innovation', 'Paired with leading scientists and 
resources, you’ll have the opportunity to learn new methods and gain experience on key equipment.');

INSERT INTO "message_types" ("title")
VALUES
('Update'),
('Feedback'),
('Important'),
('Congratulations');

INSERT INTO "announcements" ("message", "message_id")
VALUES
('We are currently in the building process of creating the future of internships!', 1),
('There is a lot of work to be done still but we are doing great, keep up the good work!', 2),
('This is NOT a finished product, not all features are implemented', 3),
('We are recognizing the IOD team in their outstanding work and dedicationg to this project!', 4);

-- INSERT INTO "students" ("email", "pronouns", "name", "picture", "banner", "about", "linkedin", "user_id")
-- VALUES (
-- 	'smrdelb@gmail.com', 
-- 	'He/Him', 
-- 	'Bennett Smrdel', 
-- 	NULL, 
-- 	NULL, 
-- 	'not existant', 
-- 	'https://www.linkedin.com/in/bennett-smrdel-634893212/', 
-- 	1
-- );

-- INSERT INTO "projects" ("project_name", "description", "user_id", "internship_id")
-- VALUES
-- ('Failed Product', 'Identified failures and bugs in a project, then fixed them to make the project working.', 1, 2),
-- ('Secure Safety', 'Built the backend of a safety project and practiced best ways to secure routes and login information', 1, 1),
-- ('Think like an Industrial Designer', 'Designed and drew out a basic T.V. stand', 1, 2);