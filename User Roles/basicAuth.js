function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403);
        return res.send('Sign in required');
    }
    next();
}

module.exports = authUser;