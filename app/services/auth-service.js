'use strict';

const lamb = require('lamb');
const userService = require('./user-service');
const bluebird = require('bluebird');
const encryptionService = require('./encryption-service');


function authenticateSocialMedia(filter, user) {
  return userService.findOne(filter).then(userByFilter =>
    lamb.isNil(userByFilter) ? userService.insert(user) :
      bluebird.resolve(userByFilter)
  );
}

function authenticateGoogle(google, firstName, lastName) {
  return authenticateSocialMedia(
    {google},
    {
      firstName,
      lastName,
      google
    }
  );
}

function authenticateFacebook(facebook, firstName, lastName) {
  return authenticateSocialMedia(
    {facebook},
    {
      firstName,
      lastName,
      facebook
    }
  );
}


function authenticateLocal(email, password) {
  return userService.findByEmail(email)
    .then(user =>
      lamb.isNil(user) ?
      bluebird.reject('USER.ERROR.NOT_FOUND') :
      encryptionService.compare(password, user.password)
        .then(result =>
          result ?
          bluebird.resolve(user) :
          bluebird.reject('USER.ERROR.INVALID_PASSWORD')
        )
  );
}

module.exports = {
  authenticateGoogle,
  authenticateFacebook,
  authenticateLocal
};
