'use strict';


function generateSchema(mongoose) {
  return new mongoose.Schema({
    name: {
      type: String,
      index: true,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    links: [{
      description: {
        type: String
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

function generateExerciseModel(mongoose) {
  const schema = generateSchema(mongoose);
  return mongoose.model('Exercise', schema);
}

module.exports = generateExerciseModel;
