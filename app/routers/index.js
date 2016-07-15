'use strict';

const userRouter = require('./user-router');
const authRouter = require('./auth-router');
const exerciseRouter = require('./exercise-router');


module.exports = (server) => {
  authRouter.addRoutes(server, '/auth');
  userRouter.addRoutes(server, '/users');
  exerciseRouter.addRoutes(server, '/exercises');
};
