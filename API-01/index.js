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
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            res.status(400).json({status : 'Bad Request (all fields are required)'});
        }
        users.push({id : users.length + 1, ...body});
        fs.writeFile('./mock data/data.json', JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).json({status : 'success'});
            }
        });
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
        const {id, first_name, last_name, email, gender, job_title} = req.body;
        // console.log(body);
        const paramID = Number(req.params.id);

        const userIndex = users.findIndex((user) => user.id === paramID);
        if (userIndex !== -1) {
            if (first_name) {
                users[userIndex].first_name = first_name;
            }
            if (last_name) {
                users[userIndex].last_name = last_name;
            }
            if (email) {
                users[userIndex].email = email;
            }
            if (gender) {
                users[userIndex].gender = gender;
            }
            if (job_title) {
                users[userIndex].job_title = job_title;
            }
            fs.writeFile('./mock data/data.json', JSON.stringify(users), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.json({ status: 'success'});
                }
            })

        } else {
            res.status(404).json({ error: 'User not found' });
        }
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