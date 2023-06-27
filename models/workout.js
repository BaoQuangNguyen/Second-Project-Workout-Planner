const mongoose = require('mongoose');
const Schema = mongoose.Schema

const workoutSchema = new mongoose.Schema( {
    bodypart: {
        type: String,
        enum: ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders']
    },
    exercises: [{
        name: {
            type: String,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        }
    }]
})

module.exports = mongoose.model('Workout', workoutSchema);

