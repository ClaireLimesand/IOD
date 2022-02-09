const isAdmin = (req, res, next) => { 
    if (req.user.access_level==3) {
        next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = { isAdmin };