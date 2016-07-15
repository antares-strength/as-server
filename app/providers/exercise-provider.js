'use strict';

const commonProvider = require('./common-provider');
const model = require('../models').Excercise;


function insert(object) {
  return commonProvider.insert(model, object);
}

function findAll() {
  return commonProvider.find(model);
}

module.exports = {
  insert,
  findAll
};
