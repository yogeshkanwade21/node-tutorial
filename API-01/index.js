const express = require('express');
const app = express();
const PORT = 4000;
const users = require('./mock data/data.json'); // from mockaroo
const fs = require('fs');

// middleware
// used for processing form data submitted through HTML forms
app.use(express.urlencoded({ extended : false }));

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
        const body = req.body;
        // console.log(body); 
        users.push({id : users.length + 1, ...body});
        fs.writeFile('./mock data/data.json', JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
            } else {
                res.json({status : 'success'});
            }
        });
        // res.json({status : 'pending'});
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
        const id = Number(req.params.id);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            // now update the data.json file
            fs.writeFile('./mock data/data.json', JSON.stringify(users), (err) => {
                if(err) {
                    console.error('Error writing to data.json:', err);
                } else {
                    res.json({status : 'success'});
                }
            });

        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });

app.listen(PORT, () => console.log(`listening on ${PORT}`));