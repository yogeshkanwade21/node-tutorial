const { getUser } = require('../service/auth');

async function restrictToLoggedInUsers(req, res, next) {
    const userSessionId = await req.cookies?.sessionId;

    if(!userSessionId){
        return res.redirect('/login');
    }

    const user = getUser(userSessionId);
    if (!user) {
        return res.redirect('/login');
    }

    req.user = user;
    next();
}

module.exports = restrictToLoggedInUsers;