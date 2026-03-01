const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  leadId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lead', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['CALL', 'WHATSAPP', 'NOTE', 'STATUS_CHANGE', 'AI_MESSAGE_GENERATED'],
    required: true 
  },
  meta: {
    duration: Number,        // For CALL
    previousStatus: String,  // For STATUS_CHANGE
    newStatus: String,       // For STATUS_CHANGE
    content: String,         // For NOTE or AI_MESSAGE_GENERATED
    aiResponse: Object       // For AI_MESSAGE_GENERATED (structured JSON)
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

activitySchema.index({ leadId: 1, _id: -1 });

module.exports = mongoose.model('Activity', activitySchema);