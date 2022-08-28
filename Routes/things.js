var express = require('express');
var router = express.Router();

router.get('/:fname/:lname', function(req, res){
   res.render("index", {fname: req.params.fname, lname: req.params.lname})
});

router.get('/:fname', function(req, res){
   res.render("index1", {fname: req.params.fname})
});

//export this router to use in our index.js
module.exports = router;