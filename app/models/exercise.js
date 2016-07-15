'use strict';


function generateSchema(mongoose) {
  return new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    links: [{
      description: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }]
  }, {
    collection: 'exercises'
  });
}

function generateUserModel(mongoose) {
  const schema = generateSchema(mongoose);
  return mongoose.model('Exercise', schema);
}

module.exports = generateUserModel;
