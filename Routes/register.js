const express = require('express')
const fs = require("fs")
const ejs = require("ejs")
const path = require("path")
const multer = require('multer');
const app = express()
const router = express.Router();

app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const upload = multer({
    dest: path.join(__dirname, '../public/uploads/')
})

router.get("/", (req, res) => {
    res.render("register")
})

router.post("/", upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'uploads' }]), (req, res) => {

    // res.send("Hello")

    for (let i = 0; i < req.files['profile'].length; i++) {
        fs.rename(path.join(__dirname, "../public/uploads/" + req.files['profile'][i].filename), path.join(__dirname, "../public/uploads/" + req.files['profile'][i].originalname), () => {
            console.log(`${req.files['profile'][i].originalname} has been stored in public/uploads`);
        })
    }

    // for (let i = 0; i < req.files['uploads'].length; i++) {
    //     fs.rename(path.join(__dirname, "/public/Uploads/" + req.files['uploads'][i].filename), path.join(__dirname, "/public/Uploads/" + req.files['uploads'][i].originalname), () => {
    //         console.log(`${req.files['uploads'][i].originalname} has been stored in public/Uploads`);
    //     })
    // }

    res.render('profile', {
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

//export this router to use in our index.js
module.exports = router;