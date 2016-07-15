'use strict';


function generateSchema(mongoose) {
  return new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    }
  }, {
    collection: 'styles'
  });
}

function generateStyleModel(mongoose) {
  const schema = generateSchema(mongoose);
  return mongoose.model('Style', schema);
}

module.exports = generateStyleModel;
