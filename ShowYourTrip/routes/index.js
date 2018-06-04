var express = require('express');
var router = express.Router();
let Trip = require('../models/trip_model');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let session = require('express-session');
let urlencodedParser = bodyParser.urlencoded({extended: false});

//mongoose.connect('mongodb://localhost/Trips');
mongoose.connect('mongodb://TripUser:tripin1@ds247270.mlab.com:47270/your_trips');

/*itemOne = Trip({title: 'Trip one',author: 'Maria',short_desc: 'My first trip',description: 'This was amazing trip',img_url: 'nothing',}).save(function (err) {
    if(err) throw err;
    console.log('items saved');
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
    //get data from mongodb and pass it to a view
    Trip.find({}, function (err, data) {
        if(err) throw err;
        res.render('index', { title: 'Trips', trips: data});
    });

});

router.get('/:id', function (req, res) {
    Trip.findById(req.params.id,
        function (err, trip) {
            if(err) throw err;
            res.render('trip', {trip: trip});
        });
});


router.get('/add', function (req, res) {
    res.render('addTrip', { title: 'Add Trip' });
});

router.post('/', urlencodedParser, function(req, res) {

    // console.log(req.body);
    //  res.render('add-succes', {data: req.body});
    let newTrip = new Trip();
    newTrip.title = req.body.title;
    newTrip.author = req.body.author;
    newTrip.short_desc = req.body.short_desc;
    newTrip.description = req.body.description;
    newTrip.img_url = req.body.img_url;

    newTrip.save(function (err) {
        if(err){
            console.log(err);
        } else {
           // req.flash('success', 'Trip Added');
            res.locals.message = req.flash('success', 'Trip Added');
            res.redirect('/')
        }
    })

   /* let newtrip = Trip(req.body).save(function (err,data) {
        if(err) throw err;
        res.json(data);
    })*/
});


router.get('/edit/:id', function (req, res) {
    Trip.findOne({
        _id:req.params.id
    }).exec(function (err, trip) {
        if(err) throw err;
        res.render('trip_edit', {trip: trip});
    });
});


//Update submit
router.post('/edit/:id', urlencodedParser, function(req, res) {

    let newTrip = {};
    newTrip.title = req.body.title;
    newTrip.author = req.body.author;
    newTrip.short_desc = req.body.short_desc;
    newTrip.description = req.body.description;
    newTrip.img_url = req.body.img_url;

    let query = {_id:req.params.id};

    Trip.update(query, newTrip, function (err) {
        if(err){
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
});


router.delete('/:id', function (req, res) {
    let query = {_id:req.params.id};
    Trip.remove(query, function (err) {
        if(err) throw err;
        res.send('Success');
    })
});


module.exports = router;
