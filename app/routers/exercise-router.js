'use strict';

const restify = require('restify');
const authRouter = require('./auth-router');
const exerciseService = require('../services/exercise-service');
const lamb = require('lamb');


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
          return next(
            new restify.errors.InternalServerError(JSON.stringify(err))
          );
        });
    }
  );

  server.get(
    prefix + '/:id',
    authRouter.authenticate,
    (req, res, next) => {
      exerciseService.findById(req.params.id)
        .then(exercise => {
          if (lamb.isNil(exercise)) {
            return next(
              new restify.errors.ResourceNotFoundError('EXERCISE.ERROR.NOT_FOUND')
            );
          }
          res.send(200, exercise);
          return next();
        })
        .catch(err =>
          next(new restify.errors.InternalServerError(JSON.stringify(err)))
        );
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
        .catch(err =>
          next(new restify.errors.InternalServerError(JSON.stringify(err)))
        );
    }
  );

  server.put(
    prefix + '/:id',
    authRouter.authenticate,
    (req, res, next) => {
      const exercise = req.body;
      exercise._id = req.params.id;
      exerciseService.update(exercise)
        .then(() => {
          res.send(200);
          return next();
        })
        .catch(err =>
          next(new restify.errors.InternalServerError(JSON.stringify(err)))
        );
    }
  );
}

module.exports = {
  addRoutes
};
