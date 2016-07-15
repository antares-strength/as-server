'use strict';

const restify = require('restify');
const authRouter = require('./auth-router');
const exerciseService = require('../services/exercise-service');


function addRoutes(server, prefix) {
  server.post(
    prefix + '/',
    authRouter.authenticate,
    (req, res, next) => {
      exerciseService.insert(req.body)
        .then(exercise => {
          res.header('location', exercise._id);
          res.send(201);
          return next();
        })
        .catch(err => {
          console.log(err);
          next(new restify.errors.InternalServerError(JSON.stringify(err)));
        });
    }
  );

  server.get(
    prefix + '/',
    authRouter.authenticate,
    (req, res, next) => {
      exerciseService.findAll()
        .then(exercises => {
          res.send(200, exercises);
          return next();
        })
        .catch()
    }
  );
}

module.exports = {
  addRoutes
};
