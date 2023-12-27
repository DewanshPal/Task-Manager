const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
