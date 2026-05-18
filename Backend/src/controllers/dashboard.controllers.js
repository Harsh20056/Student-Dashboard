const JournalModel = require("../model/journal.model");

const totalJournalController = async (req, res) => {
  try {
    let user_id = req.user._id;
    let totalJournal = await JournalModel.find({ user_id });

    let count = totalJournal.length;

    return res.status(200).json({
      success: true,
      message: "Get the number of journals",
      count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getTotalStudyHoursController = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await JournalModel.aggregate([
      { $match: { user_id: userId } },
      {
        $group: {
          _id: null,
          totalHours: { $sum: "$studyDuration" },
        },
      },
    ]);
    res.status(200).json({
      totalStudyHours: result[0]?.totalHours || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecentTopics = async (req, res) => {
  try {
    const recentTopics = await JournalModel.find({ user_id: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      message: "Recent journals",
      recentTopics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductivityOverview = async (req, res) => {
  try {
    const overview = await JournalModel.aggregate([
      { $match: { user_id: req.user._id } },
      {
        $group: {
          _id: "$difficultyLevel",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "overview",
      overview,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  totalJournalController,
  getTotalStudyHoursController,
  getRecentTopics,
  getProductivityOverview,
};
