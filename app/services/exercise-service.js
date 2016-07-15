'use strict';

const exerciseProvider = require('../providers/exercise-provider');


function insert(exercise) {
  return exerciseProvider.insert(exercise);
}

function findAll() {
  return exerciseProvider.findAll();
}

function findById(id) {
  return exerciseProvider.findById(id);
}

function update(exercise) {
  return exerciseProvider.update(exercise);
}

module.exports = {
  insert,
  findAll,
  findById,
  update
};
