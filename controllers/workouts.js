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
      const workout = await Workout.findById(req.params.id)
      res.render('workouts/edit', {
        workout
      });
    } catch (err) {
      console.log("error");
    }
  }
async function update(req, res) {
  try {
    await Workout.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.redirect(`/workouts/${req.params.id}`);
  }  catch (err) {
     res.render(`/workouts/${req.params.id}/edit`, { errorMsg: err.message });
  }
}

async function create(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    try {
      await Workout.create(req.body);
      res.redirect('/workouts');
    }
    catch (err) {
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