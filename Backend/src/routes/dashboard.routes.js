const express = require("express");
const {
  totalJournalController,
  getTotalStudyHoursController,
  getRecentTopics,
  getProductivityOverview,
} = require("../controllers/dashboard.controllers");

const router = express.Router();

router.get("/getTotalJournal", totalJournalController);
router.get("/getTotalStudyHour", getTotalStudyHoursController);
router.get("/getRecentJournal", getRecentTopics);
router.get("/productivity", getProductivityOverview);

module.exports = router;
