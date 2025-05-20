const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'El título es obligatorio'], 
    trim: true, 
    minlength: [3, 'El título debe tener al menos 3 caracteres']
  },
  description: { 
    type: String, 
    maxlength: [500, 'La descripción no puede tener más de 500 caracteres'] 
  },
  image: { 
    type: String 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Product', productSchema);

