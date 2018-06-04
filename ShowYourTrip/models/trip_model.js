let mongoose = require('mongoose');
//let Schema = mongoose.Schema;

let TripSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    short_desc:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    img_url: {
        type: String
    }
});

let Trip = module.exports = mongoose.model('Trip', TripSchema);