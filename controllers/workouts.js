const Workout = require('../models/workout');
const express = require('express');
const router = express.Router();


function newWorkout(req, res) {
  res.render('workouts/new', { errorMsg: ''})
}


async function index(req, res) {
  // fetchs all workouts from Workout, and waits till the operation is complete before rendering the view with the fetched data to index.ejs
  const workoutAll = await Workout.find({});
  res.render('workouts/index', {workouts: workoutAll})
}


async function show(req, res) {
  // fetches a specfic workout from the database by Id, and waits till operation is complete before rendering the view with the fetched data to show.ejs
  try {
    const workout = await Workout.findById(req.params.id);
    res.render('workouts/show', {workout});
  } catch {
    console.log('error')
  }
}


async function edit(req, res) {
  // same exact action as show, except renders to edit.ejs
  try {
    const workout = await Workout.findById(req.params.id);
    res.render('workouts/edit', {workout});
  } catch {
    console.log("error")
  }
}


async function create(req, res) {
  try {
    // gets the value from users input from new.ejs, and puts it the variables bodypart and the exercises empty array
    const bodypart = req.body.bodypart;
    const exercises = [];
    // loops and iterates over exercise 5 times, and with each iteration extracts the exercise name, reps and sets from req.body
    for (let i = 0; i < 5; i++) {
      const exerciseName = req.body[`exercise[${i}].name`];
      const exerciseReps = req.body[`exercise[${i}].reps`];
      const exerciseSets = req.body[`exercise[${i}].sets`];
      // if all 3 variables for exercise exist, it pushes the exercise object into the empty array in exercises
      if (exerciseName && exerciseReps && exerciseSets) {
        exercises.push({name: exerciseName, reps: parseInt(exerciseReps), sets: parseInt(exerciseSets)});
      }
    }
    // used await here to fetch all the input data first from new.ejs, before it creates a new Workout document in the database with fetched data
    const workout = await Workout.create({bodypart, exercises});
    // after new Workout document has been created, redirects to the index.ejs with newly created workout
    res.redirect('/workouts');
  } catch {
    console.log("error")
  }
}


async function update(req, res) {
  try {
    // same as create, gets the value from users input from edit.ejs
    const bodypart = req.body.bodypart;
    const exercises = req.body.exercises;
    // finds the existing workout from the database by id, and waits before assigning it to workout
    const workout = await Workout.findById(req.params.id);
    // Shoutout to Chris for helping me with this! Assigns the current existing workout document to exercises, to iterate over using the forEach method, and finally saves the new value to the database with .save method
    const exercisess = workout.exercises;
    exercisess.forEach((e, i) => {
      e.name = req.body[`exercises[${i}].name`];
      e.reps = req.body[`exercises[${i}].reps`];
      e.sets = req.body[`exercises[${i}].sets`];
    }),
    await workout.save();
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, {bodypart, exercises}, {new: true});
      res.redirect(`/workouts/${workout._id}`);
  } catch {
    console.log("error")
  }
}


async function deleteWorkout(req, res) {
  // fetchs the data by Id from the newly created workout, waits till data is fetched before deleting the Id from view and database, before rendering back to index.ejs
  try {
    await Workout.findByIdAndRemove(req.params.id);
    res.redirect('/workouts');
  }  catch {
    console.log("error")
  }
}
  

module.exports = {
  new: newWorkout,
  index,
  show,
  edit,
  create,
  update,
  delete: deleteWorkout
}