
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
	"user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
	"internship_id" INT REFERENCES "internships" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "skills" (
	"id" SERIAL PRIMARY KEY,
	"skill" TEXT,
	"user_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE
);

-- test data

INSERT INTO "internships" ("id", "company_name", "start_date", "end_date", "company_logo", "company_subtitle", "company_description") 
VALUES ('1', '3M', '2022-06-24', '2022-08-24', '3m_logo.png', 'Design Research and Innovation', 'Paired with leading scientists and 
resources, you’ll have the opportunity to learn new methods and gain experience on key equipment.');