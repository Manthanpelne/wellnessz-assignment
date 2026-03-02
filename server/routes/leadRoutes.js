const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { protect } = require('../middlewares/authMiddleWare');
const { aiRateLimiter } = require('../middlewares/rate-limiter');

router.use(protect); 


router.get("/dashboard/stats", leadController.getDashboardStats);

router.route('/')
  .get(leadController.getLeads)
  .post(leadController.createLead);

router.get('/:id/timeline', leadController.getTimeline); 
router.post("/:id/generate-message", aiRateLimiter, leadController.generateAIContent);

router.route('/:id')
  .get(leadController.getLeadById)
  .patch(leadController.updateLead)
  .delete(leadController.deleteLead);

module.exports = router;