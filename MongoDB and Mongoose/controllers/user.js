const User = require('../models/user');

async function handleGetAllUsers(req, res)  {
    const allUsers = await User.find({});
    // const html = `
    //     <ul>
    //         ${allUsers.map((user) => `<li> ${user.firstName} ${user.lastName} - ${user.email}</li>`).join("")}
    //     </ul>
    // `
    // res.send(html);
    res.json(allUsers);
};

async function handleCreateUser(req, res) {
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
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}

async function handleUpdateUserById(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new : true });

        if (!user) {
            res.status(404).json({status: 'User Not Found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function handleDeleteUserById(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            res.status(404).json({status: 'User Not Found'});
        }
        res.json({deleted: user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {handleGetAllUsers, handleCreateUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById};