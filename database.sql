
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

CREATE TABLE "internships" (
	"id" SERIAL PRIMARY KEY,
	"company_name" VARCHAR(300),
	"date" TEXT
);

CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"project_name" VARCHAR(100),
	"description" VARCHAR(255),
	"user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
	"internship_id" INT REFERENCES "internships" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "skills" (
	"id" SERIAL PRIMARY KEY,
	"skill" TEXT,
	"user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "announcements" (
	"id" SERIAL PRIMARY KEY,
	"message" TEXT
);

CREATE TABLE "users_internships" (
	"id" SERIAL PRIMARY KEY,
	"start_date" DATE,
	"end_date" DATE,
	"user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
	"internship_id" INT REFERENCES "internships" ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "students" ("email", "pronouns", "name", "picture", "banner", "about", "linkedin", "user_id")
VALUES (
	'smrdelb@gmail.com', 
	'He/Him', 
	'Bennett Smrdel', 
	NULL, 
	NULL, 
	'not existant', 
	'https://www.linkedin.com/in/bennett-smrdel-634893212/', 
	1
);
