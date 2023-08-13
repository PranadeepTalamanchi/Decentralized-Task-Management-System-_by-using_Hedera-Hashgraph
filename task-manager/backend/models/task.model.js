const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  Deadline: {
    type: Date,
    required: true
  },
}, {
  timestamps: true
});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;