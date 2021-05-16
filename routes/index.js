var express = require('express');
var router = express.Router();

var db = require('../database')
var ObjectId = require('mongodb').ObjectID;

//    LIST   ////
router.get('/', function(req, res) {
    db.get().collection('plants').find().toArray(function(err, docs) {
        res.render('index', {title: 'Plants catalog', plants: docs})
    })
})

////   EDIT   ////
//   view
router.get('/edit', function(req, res) {
        db.get().collection('plants').find().toArray(function(err, docs) {
        res.render('edit', {title: 'Edit plants', plants: docs})
    })
})

router.post('/edit', function(req, res) {
    //var editedId = req.query.id // if GET param in action="edit?id=..."
    var editedId = req.body.id  // if POST param in hidden input
    result = db.get().collection('plants').updateOne(
        { "_id" : ObjectId(editedId) },
        {
            name:     req.body.title,
            expo:     req.body.expo,
            arrosage: req.body.arrosage,
            txt:      req.body.txt,
        },
        function(err, doc){
            if (err)
                res.render('message', {message: "There was a problem editing the plant to the database."});
            else
                res.redirect('/edit')//*/
    })
})

//   add plant
router.post('/add', function(req, res){
    db.get().collection('plants').insert({
        name:     req.body.title,
        expo:     req.body.expo,
        arrosage: req.body.arrosage,
        txt:      req.body.txt,
        temperature : {
            min:  req.body.temp_min,
            max:  req.body.temp_max
        },
        img:      req.body.title + '.jpg'  // TODO : add image to public/images/
    }, function (err, doc) {
        if (err)
            res.render('message', {message: "There was a problem adding the plant to the database."});
        else
            res.render('edit', {title: 'Added plants '+ req.body.title, plants: docs})
    })
});


router.get('/remove', function(req, res){
    console.log(' >>> deleting plant where _id is '+ req.query.id )
    db.get().collection('plants').remove(
        { "_id" : ObjectId(req.query.id) },
        function(err, doc) {
        if (err)
            res.render('message', {message: "There was a problem removing the plant from the database."});
        else
            res.redirect("/edit");
    });
})




module.exports = router;
