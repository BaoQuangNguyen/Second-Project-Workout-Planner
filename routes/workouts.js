var express = require('express');
var router = express.Router();

const workoutCtrl = require('../controllers/workouts');
const workout = require('../models/workout');

router.get('/', workoutCtrl.index);
router.get('/new', workoutCtrl.new);
router.get('/:id', workoutCtrl.show);
router.get('/:id/edit', workoutCtrl.edit);

router.post('/', workoutCtrl.create);
router.put('/:id', workoutCtrl.update);
router.delete('/:id', workoutCtrl.delete);



module.exports = router;