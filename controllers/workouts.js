const Workout = require('../models/workout');
const express = require('express');
const router = express.Router();


function newWorkout(req, res) {
  res.render('workouts/new', { errorMsg: ''});
}

async function index(req, res){
  const workoutAll = await Workout.find({})
  res.render('workouts/index', {
    workouts: workoutAll,
  })
}


async function show(req, res) {
  try {
    const workout = await Workout.findById(req.params.id);
    res.render('workouts/show', {workout});
  } catch {
    console.log('error')
  }
}

async function edit(req, res) {
    try {
      const workout = await Workout.findById(req.params.id )
      res.render('workouts/edit', {
        workout
      });
    } catch (err) {
      console.log("error");
    }
  }

 async function update(req, res) {
  try {
    const { bodypart, exercises } = req.body;
    const workout = await Workout.findById(req.params.id)
    const exercisess = workout.exercises;
    exercisess.forEach((e, i) => {
      e.name = req.body[`exercises[${i}].name`]
      e.reps = req.body[`exercises[${i}].reps`]
      e.sets = req.body[`exercises[${i}].sets`]
    }),
    await workout.save();
    console.log(req.body)

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { bodypart, exercises },
      { new: true }
    );

    res.redirect(`/workouts/${workout._id}`);
  } catch (err) {
    console.log(err)
    res.render('error', { errorMsg: err.message });
  }
}

  
  
  
  

async function create(req, res) {
  try {
    const bodypart = req.body.bodypart;
    const exercises = [];
    for (let i = 0; i < 5; i++) {
      const exerciseName = req.body[`exercise[${i}].name`];
      const exerciseReps = req.body[`exercise[${i}].reps`];
      const exerciseSets = req.body[`exercise[${i}].sets`];
      if (exerciseName && exerciseReps && exerciseSets) {
        exercises.push({
          name: exerciseName,
          reps: parseInt(exerciseReps),
          sets: parseInt(exerciseSets)
        });
      }
    }
    const workout = await Workout.create({
      bodypart,
      exercises
    });
    res.redirect('/workouts');
  } catch (err) {
    res.render('workouts/new', { errorMsg: err.message });
  }
}

async function deleteWorkout(req, res) {
  try {
    await Workout.findByIdAndRemove(req.params.id);
    res.redirect('/workouts');
  }  catch (err) {
    res.render('/workouts', { errorMsg: err.message });
  }
}
  
module.exports = {
    new: newWorkout,
    index,
    show,
    edit,
    create,
    update,
    delete: deleteWorkout,
}