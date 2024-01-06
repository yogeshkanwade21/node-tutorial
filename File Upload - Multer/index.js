const express = require('express');
const app = express();
const multer  = require('multer');
const PORT = 5500;

// disk Storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, './uploads');
        // we can make user subfolder
    },
    filename: function (req, file, callback) {
        return callback(null, `${Date.now()}-${file.originalname}`);
    }
})


const upload = multer({ storage })

app.set('view engine', 'ejs');
app.use(express.urlencoded());

// routes
app.get('/home', (req, res) => {
    res.render('home');
})

app.post('/upload', upload.single('profilePhoto'), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);

    return res.redirect('/home');
})

// server
const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

// checking server error
server.on('error', (err) =>{
    console.error(`server error: ${err.message}`);
});