const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate: { type: Date },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    text: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  attachments: [{ type: String }],
  tags: [{ type: String }],
  progress: { type: Number, min: 0, max: 100, default: 0 }
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
