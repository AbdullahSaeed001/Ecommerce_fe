const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, default:"seller" },
},{
  timestamps: true, 
});

module.exports = mongoose.model('User', userSchema);