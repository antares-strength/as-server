'use strict';

const bluebird = require('bluebird');
const mongoose = bluebird.promisifyAll(require('mongoose'));


function getProjection(customProjection) {
  return Object.assign(
    {},
    customProjection,
    {__v: false}
  );
}

function insert(Model, object) {
  return new Model(object).save();
}

function isIdValid(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function findOne(model, filter, customProjection) {
  const projection = getProjection(customProjection);
  return model.findOne(filter, projection);
}

function findById(model, id, customProjection) {
  const projection = getProjection(customProjection);
  return isIdValid(id) ?
    findOne(model, {'_id': id}, projection) :
    bluebird.resolve(null);
}

function find(model, customProjection) {
  const projection = getProjection(customProjection);
  return model.find()
    .select(projection);
}

function update(model, object) {
  return model.findByIdAndUpdate(
    object._id,
    {
      $set: object,
      $inc: { __v: 1 }
    }
  );
}

module.exports = {
  insert,
  findById,
  findOne,
  isIdValid,
  find,
  update
};
