const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  source: { type: String, enum: ['Instagram', 'Referral', 'Ads'], required: true },
  status: { 
    type: String, 
    enum: ['NEW', 'CONTACTED', 'INTERESTED', 'CONVERTED', 'LOST'],
    default: 'NEW' 
  },
  tags: [String],
  nextFollowUpAt: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Indexing for filtering & dashboard performance
leadSchema.index({ assignedTo: 1, status: 1 });
leadSchema.index({ nextFollowUpAt: 1 });

module.exports = mongoose.model('Lead', leadSchema);