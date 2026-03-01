const Activity = require('../models/Activity');
const Lead = require('../models/Lead');


// CREATE LEAD
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      assignedTo: req.user.id 
    });

    await Activity.create({
      leadId: lead._id,
      type: 'STATUS_CHANGE',
      meta: { newStatus: 'NEW', note: 'Lead Created' }
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.getLeads = async (req, res) => {
  try {
    const { status, source, search } = req.query;
    let query = { assignedTo: req.user.id };

    // Filter by Status/Source
    if (status) query.status = status;
    if (source) query.source = source;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads' });
  }
};



exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({ 
      _id: req.params.id, 
      assignedTo: req.user.id 
    });

    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE LEAD + LOG ACTIVITY
exports.updateLead = async (req, res) => {
  try {
    const oldLead = await Lead.findById(req.params.id);
    if (!oldLead) return res.status(404).json({ message: 'Lead not found' });

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    // If status changed, create a timeline activity automatically
    if (req.body.status && oldLead.status !== req.body.status) {
      await Activity.create({
        leadId: updatedLead._id,
        type: 'STATUS_CHANGE',
        meta: { 
          previousStatus: oldLead.status, 
          newStatus: updatedLead.status 
        }
      });
    }
    res.json(updatedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// DELETE LEAD
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({ 
      _id: req.params.id, 
      assignedTo: req.user.id 
    });
    
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    
    await Activity.deleteMany({ leadId: req.params.id });

    res.json({ message: 'Lead and associated activities deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET TIMELINE (Cursor-based Pagination)
exports.getTimeline = async (req, res) => {
  try {
    const { cursor, limit = 10 } = req.query;
    const query = { leadId: req.params.id };

    // Use _id as the cursor for stability
    if (cursor) {
      query._id = { $lt: cursor }; 
    }

    const activities = await Activity.find(query)
      .sort({ _id: -1 }) 
      .limit(Number(limit));

    const nextCursor = activities.length > 0 
      ? activities[activities.length - 1]._id 
      : null;

    res.json({ activities, nextCursor });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timeline' });
  }
};