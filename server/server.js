const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
// const cloudinary = require("cloudinary").v2;

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// cloudinary.uploader
// .upload('./public/images/profile_pic.jpeg', {
//     resource_type: "image",
// })
// .then((result) => {
//     console.log('success', JSON.stringify(result, null, 2));
// })
// .catch((error) => {
//     console.log('error', JSON.stringify(error, null, 2));
// });

// Route includes
const userRouter = require('./routes/user.router');
const skillsRouter = require('./routes/skills.router');
const internshipRouter = require('./routes/internship.router');
const profileRouter = require('./routes/profile.router');
const pictureRouter = require('./routes/picture.router');
const bannerRouter = require('./routes/banner.router');
const announcementsRouter = require('./routes/announcements.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/internship', internshipRouter);
app.use('/api/profile', profileRouter);
app.use('/api/picture', pictureRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/announcements', announcementsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
