const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  userTags: [String],
  chartTags: [{
    name: String,
    sign: String,
    degree: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);