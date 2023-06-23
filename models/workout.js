const mongoose = require('mongoose');
const Schema = mongoose.Schema

const workoutSchema = new mongoose.Schema( {
    bodypart: {
        type: String,
    }
    

})

module.exports = mongoose.model('Workout', workoutSchema);

