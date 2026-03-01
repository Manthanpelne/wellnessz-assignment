const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { protect } = require('../middlewares/authMiddleWare');


router.use(protect); 

router.route('/')
  .get(leadController.getLeads)
  .post(leadController.createLead);

router.route('/:id')
  .get(leadController.getLeadById)
  .patch(leadController.updateLead)
  .delete(leadController.deleteLead);

// Timeline route
router.get('/:id/timeline', leadController.getTimeline);


module.exports = router;