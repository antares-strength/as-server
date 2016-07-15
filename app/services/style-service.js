'use strict';

const styleProvider = require('../providers/style-provider');


function insert(exercise) {
  return styleProvider.insert(exercise);
}

function findAll() {
  return styleProvider.findAll();
}

function findById(id) {
  return styleProvider.findById(id);
}

function update(exercise) {
  return styleProvider.update(exercise);
}

module.exports = {
  insert,
  findAll,
  findById,
  update
};
