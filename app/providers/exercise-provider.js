'use strict';

const commonProvider = require('./common-provider');
const model = require('../models').Exercise;


function insert(object) {
  return commonProvider.insert(model, object);
}

function findAll() {
  return commonProvider.find(model);
}

function findById(id) {
  return commonProvider.findById(model, id);
}

function update(exercise) {
  return commonProvider.update(model, exercise);
}

module.exports = {
  insert,
  findAll,
  findById,
  update
};
