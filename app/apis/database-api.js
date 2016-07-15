'use strict';

const logger = require('./logger-api');
const configResource = require('../services/config-service');
const BirdPromise = require('bluebird');
const mongoose = require('mongoose');
const lamb = require('lamb');

let connection;


function connect() {
  return new BirdPromise((resolve, reject) => {
    mongoose.connect(configResource.getDBConnectionURI());
    connection = mongoose.connection;
    connection.on('error', err => {
      logger.error(
        `Could not connected to database server on 
      '${configResource.getDBConnectionURI()}' due to error: + ${err}`
      );
      reject(err);
    });
    connection.once('open', () => {
      logger.info(
        `Connected to database server on '${configResource.getDBConnectionURI()}'`
      );
      resolve();
    });
  });
}

function close() {
  if (!lamb.isNil(connection)) {
    connection.close();
  }
}

function dropDatabase() {
  connection.db.dropDatabase();
}

module.exports = {
  connect,
  close,
  dropDatabase
};
