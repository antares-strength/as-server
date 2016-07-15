'use strict';

const exerciseProvider = require('../providers/exercise-provider');


function insert(exercise) {
  return exerciseProvider.insert(exercise);
}

function findAll() {
  return exerciseProvider.findAll();
}

module.exports = {
  insert,
  findAll
};
