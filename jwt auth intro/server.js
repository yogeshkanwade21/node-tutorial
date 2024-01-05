require('dotenv').config()
const express = require('express')
const app = express();
const PORT = 5000;

const jwt = require('jsonwebtoken');

// middleware
app.use(express.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // to get the bearer token
    // the format of request header is following
    // Authorization: Bearer token
    // so we need to get the token by split method
    if (token == null) {
        res.status(401).send('401 Unauthorized Access/Null token');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            // 403 means the server understands the request but refuses to authorize it
            // web server recognizes the request but can't provide access
            // maybe due to file permission settings 
            res.status(403).send('403 Forbidden');
        }
        req.user = user;
        next()
    }
    )
}

// dummy data
const posts = [
    {
        username: 'Yogesh',
        // title: `post by ${posts[0].username}`
    },
    {
        username: 'Peter',
    }
];

// dynamically generating titles
const postsWithDynamicTitles = posts.map((post) => (
    {
        ...post,
        title: `Post by ${post.username}`,
        server: 1
    }
))

//routes
app.get('/posts', authenticateToken,(req, res) => {
    res.json(postsWithDynamicTitles.filter((post) => post.username === req.user.name));
})

app.post('/login', (req, res) => {
    // Todo - Authenticate User by Username and Password
    const username = req.body.username;
    const user = {name : username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken});
})

//server configuration
const server = app.listen(PORT, () => {`Server running on port ${PORT}`})

server.on('error', (err) => console.log(err.message));