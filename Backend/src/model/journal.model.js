const { default: mongoose } = require("mongoose");

let journalSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    topicName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    studyDuration: {
      type: Number,
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

let JournalModel = mongoose.model("journals", journalSchema);

module.exports = JournalModel;
