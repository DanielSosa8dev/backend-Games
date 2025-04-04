const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  platform: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Platform', 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'El precio no puede ser negativo']
  },
  discount: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 100
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);