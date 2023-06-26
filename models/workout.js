const mongoose = require('mongoose');
const Schema = mongoose.Schema

const workoutSchema = new mongoose.Schema( {
    bodypart: {
        type: String,
        enum: ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders']
    },
    exercise: {
        type: Array,
    },
    reps: {
        type: Number,
    }


    

})

module.exports = mongoose.model('Workout', workoutSchema);

