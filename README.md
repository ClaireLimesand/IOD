![Repo Size](https://img.shields.io/github/languages/code-size/Internship-on-Demand/IOD.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/Internship-on-Demand/IOD.svg?style=for-the-badge) ![FORKS](https://img.shields.io/github/forks/Internship-on-Demand/IOD.svg?style=for-the-badge&social) ![Stars](https://img.shields.io/github/stars/Internship-on-Demand/IOD.svg?style=for-the-badge)
    
# Internship On Demand
*Duration: 2 weeks*

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)
- [Contacts](#contacts)

## Description

IOD (Internship on Demand) is an app that grants students an easier and more simplified experience with applying for internships. Students enrolled in the courses at IOD will be able to register on this app, create a profile, and search for internships to apply for. They will also be able to showcase their work on their own portfolio page to highlight their relevant experience. Administrators can add new internships, keep students up to date with announcements on the home page, and view internship applicants. 

This application was made by Bennet Smrdel, Caleb Hatch, Claire Limesand, and Myika Marshall in collaboration with Internship On Demand and Prime Digital Academy. 

![Working Image](/public/iodGif.gif)

<img src="" />## Built With

<a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a><a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a><a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px" /></a><a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a><a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a><a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>

## Getting Started

*Duration: 2 weeks*

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)

### Installation

- Create a new database called `iod` 
- The queries in the `database.sql` file are set up to create and populate the necessary tables to allow this application to run correctly. Install [PostgreSQL](https://www.postgresql.org/download/) for your database and [Postico](https://eggerapps.at/postico/) to run the queries.
- Create a `.env` file at the root of the project and paste this line into the file:
 ```
SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, replace `superDuperSecret` with a long random string to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- The image and PDF upload in this application require an account with Cloudinary. For a free account go here: 
https://cloudinary.com/users/register/free
and insert the following into your `.env` file:
 ```
CLOUDINARY_CLOUD_NAME=YOUR CLOUD NAME
CLOUDINARY_API_KEY=YOUR CLOUDINARY API KEY
CLOUDINARY_API_SECRET=YOUR CLOUDINARY SECRET
CLOUDINARY_URL=YOUR CLOUDINARY URL
 ```
this will give you access to the image upload feature. The PDF upload to view resumes will require an upgraded paid account. 
- This application also has optional Zapier integration and will send an email to a user when they sign up. To activate this you will need a paid account with Zapier. You can then enter the following into your `.env` file: 
 ```
ZAPIER_REGISTER_URL=YOUR ZAPIER URL 
 ```
- Run `npm install`
- Start postgres if not running already by using `brew services start postgresql`
- Running the server code requires `nodemon`. If you don't already have `nodemon`, install it globally with `npm install nodemon --global`. 
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Usage

1. When you get to the landing page of the account, click register to create an account. If you already have one then click login.
2. Upon login, a user should first navigate to “Profile” on the sidebar. Here, a user can create a customized profile. The user should update the page with a profile and banner photo using the add image icons and add personal information using the various add and update icons across the page. This information can be updated or deleted by the user at any time. Here the user can also upload a resume. A complete user profile will look like this: 
![Working Image](/public/IOD-profile-view.png)
3. On the profile page, a user can navigate to their portfolio by clicking the “Portfolio” button underneath their name. Here, they can add, update, and delete projects that they are proud of and want users to view. They can click the star button next to a project to make it their “favorite project” which will be highlighted on their profile page.
![Working Image](/public/IOD-portfolio-view.png)
4. On the Internships page a user can browse the internships available through Internship on Demand. Clicking "Apply" will notify the administrator. 
5. On the Home Page students can view announcements by the Internship On Demand team to stay up-to-date. 
6. On the students page a user can view what other students are using the Internship On Demand application. By clicking on "Load Profile" they can see check out other user-profiles, view their resume, and connect via the LinkedIn link.  
7. (Admin) To create your first admin user you will have to go into the “user” table in your "iod" database and change the access_level of a preexisting user to "3". After this, creating new admins is simple and can be done on the admin page of the application. This will give the user the ability to add, edit, and delete internships and homepage announcements. 
![Working Image](/public/IOD-internship-view.png)
8. (Admin) Having an access_level of "3" will also give the user access to the "Admin" page. On this page an administrator can see which users have applied to what internshps. Here they can also turn any other user into an admin by clicking the shield next to their name in the "Manage Users" section. 
![Working Image](/public/IOD-admin-view.png)


## Acknowledgements

Thanks to Prime Digital Academy who helped us make this application a reality. Special thanks to our classmates and our instructor Matt Black.

