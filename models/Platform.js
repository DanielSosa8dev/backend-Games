const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  icon: String
}, { timestamps: true });

module.exports = mongoose.model('Platform', PlatformSchema);