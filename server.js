const express = require('express')
const fs = require("fs")
const ejs = require("ejs")
const path = require("path")
const multer = require('multer');
const app = express()
const port = 3000 || process.env.port;

app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

var things = require('./Routes/things.js');

//both index.js and things.js should be in same directory
app.use('/things', things);

const upload = multer({
    dest: 'public/uploads/',
})

app.get("/", (req, res) => {
    res.render("DataIN")
})

app.post("/getData",  upload.fields([{name: 'profile', maxCount: 1}, {name: 'uploads'}]), (req, res) => {
    
    for (let i = 0; i < req.files['profile'].length; i++) {
        fs.rename(path.join(__dirname, "/public/Uploads/" + req.files['profile'][i].filename), path.join(__dirname, "/public/Uploads/" + req.files['profile'][i].originalname), () => {
            console.log(`${req.files['profile'][i].originalname} has been stored in public/Uploads`);
        })
    }
     
    for (let i = 0; i < req.files['uploads'].length; i++) {
        fs.rename(path.join(__dirname, "/public/Uploads/" + req.files['uploads'][i].filename), path.join(__dirname, "/public/Uploads/" + req.files['uploads'][i].originalname), () => {
            console.log(`${req.files['uploads'][i].originalname} has been stored in public/Uploads`);
        })
    }

    res.render('DataOUT', {
        textData: req.body,
        imgData: req.files
    })

    console.log(
        req.body,
        req.files
    );
    // res.send(
    //     [
    //         req.body,
    //         req.files
    //     ]
    // )
    
});

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port} at ${new Date()}`))