const express = require('express');
const app = express();
const PORT = 4000;

//database
const mongoose = require('mongoose');
const User = require('./user');

mongoose.connect('mongodb://127.0.0.1:27017/pagination').then(() => {
    console.log('MongoDB connected');
    // Dummy data seeding
    seedDummyData();
})
    .catch(err => console.error('MongoDB connection error:', err.message));


//function to seed dummy data
async function seedDummyData() {
    try {
        if (await User.countDocuments().exec() > 0) return;
        await User.insertMany([
            { name: 'User 1' },
            { name: 'User 2' },
            { name: 'User 3' },
        ]);
        console.log('Dummy users seeded');
    } catch (err) {
        console.error('Error seeding dummy data:', err);
    }
}

//middleware
app.use(express.json());
function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * 5;
        const endIndex = (page * limit);
        const results = {};
        if(endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if(startIndex > 0){
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = results;
            next();
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    };
}

app.get('/', (req, res) => {
    res.send("Server running");
});

app.get('/users', paginatedResults(User), (req, res) => {
    res.send(res.paginatedResults);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});