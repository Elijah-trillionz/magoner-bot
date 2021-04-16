const mongoose = require('mongoose');

const ProjectIdeaSchema = mongoose.Schema({
  project: String,
  src: String,
  type: String,
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('ProjectIdeas', ProjectIdeaSchema);
