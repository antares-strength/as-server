'use strict';

const restify = require('restify');
const authRouter = require('./auth-router');
const styleService = require('../services/style-service');
const lamb = require('lamb');


function addRoutes(server, prefix) {
  server.post(
    prefix + '/',
    authRouter.authenticate,
    (req, res, next) => {
      styleService.insert(req.body)
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
      styleService.findById(req.params.id)
        .then(exercise => {
          if (lamb.isNil(exercise)) {
            return next(
              new restify.errors.ResourceNotFoundError('STYLE.ERROR.NOT_FOUND')
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
      styleService.findAll()
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
      const style = req.body;
      style._id = req.params.id;
      styleService.update(style)
        .then(
          () => {
            res.send(200);
            return next();
          }
        )
        .catch(
          err =>
            next(new restify.errors.InternalServerError(JSON.stringify(err)))
        );
    }
  );
}

module.exports = {
  addRoutes
};
