'use strict';


function generateSchema(mongoose) {
  return new mongoose.Schema({
    identifier: {
      type: Number,
      required: true,
      unique: true
    },
    toDos: [{
      style: {
        // ref to styles
      }
    }]
  }, {
    collection: 'templates'
  });
}

function generateWorkoutModel(mongoose) {
  const schema = generateSchema(mongoose);
  return mongoose.model('Template', schema);
}

module.exports = generateWorkoutModel;
