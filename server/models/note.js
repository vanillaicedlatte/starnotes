const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    tags: [String],
    rating: { type: String, enum: ['negative', 'neutral', 'positive'] },
    chartData: {
      sun: { sign: String, degree: Number, house: Number },
      moon: { sign: String, degree: Number, house: Number },
      mercury: { sign: String, degree: Number, house: Number },
      venus: { sign: String, degree: Number, house: Number },
      mars: { sign: String, degree: Number, house: Number },
      jupiter: { sign: String, degree: Number, house: Number },
      saturn: { sign: String, degree: Number, house: Number },
      uranus: { sign: String, degree: Number, house: Number },
      neptune: { sign: String, degree: Number, house: Number },
      pluto: { sign: String, degree: Number, house: Number },
      northNode: { sign: String, degree: Number, house: Number },
      southNode: { sign: String, degree: Number, house: Number },
      midheaven: { sign: String, degree: Number, house: Number },
      ascendant: { sign: String, degree: Number, house: Number },
      descendant: { sign: String, degree: Number, house: Number },
      imumCoeli: { sign: String, degree: Number, house: Number },
      chiron: { sign: String, degree: Number, house: Number },
      partOfFortune: { sign: String, degree: Number, house: Number },
  },
    linkedChart: { type: Schema.Types.ObjectId, ref: 'SavedChart' },
  }, { timestamps: true });

  // Create model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;