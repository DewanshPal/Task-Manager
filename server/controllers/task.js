const express = require("express");
const router = express.Router();
const Task = require("../Models/Task");
const User = require("../Models/User");
const { builtinModules } = require("module");

const getTasks = async (req, res) => {
  const { id } = req.body;
  try {
    const ue = await User.findOne({ _id: id }).populate("tasks");
    res.status(200).json({ tasks: ue.tasks });
  } catch (err) {
    console.log(err);
    res.json({ err: "something went wrong" });
  }
};

const addTask = async (req, res) => {
  try {
    const { id, task } = req.body;
    if (!id || !task) return res.json({ err: "something went wrong" });
    console.log(id,task);
    const newTask = new Task({ task, completed: false });
    await newTask.save();
    console.log("task created");
    const ue = await User.findOne({ _id: id });
    console.log(ue);
    ue.tasks = ue.tasks.concat(newTask._id);
    await ue.save();
    res.status(200).json({ mess: "Task added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ err: "something went wrong" });
  }
};
const deleteTask = async (req, res) => {
  const { userId, taskId } = req.body;
  try {
    const ue = await Task.deleteOne({ _id: taskId });
    const user = await User.findOne({ _id: userId });
    user.tasks = user.tasks.filter((tid) => {
      return tid != taskId;
    });
    await user.save();
    res.status(200).json({ mess: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    res.json({ err: "something went wrong" });
  }
};
const updateTask = async (req, res) => {
  const { id, task, completed } = req.body;
  try {
    const ue = await Task.findOne({ _id: id });
    if (ue) {
      if (task) ue.task = task;
      if (completed != null) ue.completed = completed;
      await ue.save();
      res.status(200).json({ mess: "updated successfully" });
    } else {
      res.status(400).json({ mess: "Task not found" });
    }
  } catch (err) {
    console.log(err);
    res.json({ err: "something went wrong" });
  }
};

module.exports = {
  getTasks,
  deleteTask,
  addTask,
  updateTask,
};
