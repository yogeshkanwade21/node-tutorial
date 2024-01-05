require('dotenv').config()
const express = require('express')
const app = express();
const PORT = 5100;

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '25s'})
}

// middleware
app.use(express.json());

let refreshTokens = [

];

//routes
app.post('/token', (req, res) => {
    const refreshToken =  req.body.token;
    if (refreshToken == null) {
        res.status(401).send('null refresh token');
    }
    if (!refreshTokens.includes(refreshToken)) {
        res.status(403).send('refresh token not found');
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err){
            res.status(403).send('error');
        }
        const accessToken = generateAccessToken({name : user.name})
        res.json({accessToken: accessToken})
    })

})

app.post('/login', (req, res) => {
    // Todo - Authenticate User by Username and Password
    const username = req.body.username;
    const user = {name : username}
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    res.json({accessToken: accessToken, refreshToken: refreshToken});
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token!== req.body.token);
    res.status(204)
    // A status code '204 No Content' indicates a successful request
    // and sends an empty response body,
    // which is appropriate for a successful 204 No Content response.
    // res.status(204).send("Message")
    // thus do not do this
})

//server configuration
const server = app.listen(PORT, () => {`Server running on port ${PORT}`})

server.on('error', (err) => console.log(err.message));