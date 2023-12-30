const express = require('express');
const app = express();
const port = 4000;
const users = require('./mock data/data.json');

// Routes
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li> ${user.first_name}`).join("")}
        </ul>
    `;
    res.send(html);
})

// REST API
app.route('/api/users')
    .get((req, res) => {
        res.send(users);
    })
    .post((req, res) => {
        // Create a new user
        res.json({status : 'pending'});
    })

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    })
    .patch((req, res) => {
        // TODO: edit user
        res.json({status : 'pending'});
    })
    .delete((req, res) => {
        // TODO: delete user
        res.join({status : 'pending'});
    });

app.listen(port, () => console.log(`listening on ${port}`));