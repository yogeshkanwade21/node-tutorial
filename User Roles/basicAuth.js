function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403);
        return res.send('Sign in required');
    }
    next();
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401);
            return res.send('Not authorized');
        }
        next();
    }
}

module.exports = {authUser, authRole};