const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: String,
  email: String,
  password: String, // Hashed password
  savedCharts: [{ type: Schema.Types.ObjectId, ref: 'SavedChart' }],
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;