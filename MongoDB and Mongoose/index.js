const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 4000;

// Mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/node-tutorial')
.then(() => console.log('MongoDB Connection established'))
.catch((err) => console.error('Connection error: ', err));

//user Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: 'string',
        required: true,
    },
    lastName: {
        type: 'string',
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    gender: {
        type: 'string',
    },
    jobTitle: {
        type: 'string',
    },
}, {timestamps: true}
);

// model
const User = mongoose.model('users', userSchema);

// for processing form data
app.use(express.urlencoded({ extended : false }));

app.route('/api/users')
    .get( async (req, res) => {
        const allUsers = await User.find({});
        const html = `
            <ul>
                ${allUsers.map((user) => `<li> ${user.firstName} ${user.lastName} - ${user.email}</li>`).join("")}
            </ul>

        `
        res.send(html);
    })
    .post( async (req, res) =>{
        const body = req.body;
        const {firstName, lastName, email, gender, jobTitle} = body;
        if(!firstName || !lastName || !email || !gender || !jobTitle ||!body){
            res.status(400).json({ error: 'Bad Request (all fields are required)' });
        }
        try {
            const result = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                gender: gender,
                jobTitle: gender
            });
            // console.log(result);
            res.status(201).json({status: 'Created'});
        } catch (error) {
            console.error('User creation error:', error);
        }
    })

app.route('/users/:id')
    .get( async (req, res) =>{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    })
    .patch( async (req, res) =>{
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new : true });

            if (!user) {
                res.status(404).json({status: 'User Not Found'});
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .delete( async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if(!user) {
                res.status(404).json({status: 'User Not Found'});
            }
            res.json({deleted: user});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    })

const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

server.on('error', (err) =>{
    console.error(`server error: ${err.message}`);
});