const express = require("express");  
const router = express.Router();
const Task = require("../models/task.model");

// Create a new task
router.post("/add", async (req, res) => {
  try {
    const { user, description, Deadline } = req.body;
    const newTask = new Task({ user, description, Deadline });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a task by ID
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update only the fields that are provided in the request body
    if (req.body.description) {
      task.description = req.body.description;
    }
    if (req.body.Deadline) {
      task.Deadline = req.body.Deadline;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update a task by ID
router.route('/update/:id').post(async (req, res) => {
  try {
    const taskId = req.params.id;
    const { user, description, Deadline } = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task properties
    task.user = user;
    task.description = description;
    task.Deadline = Deadline;

    // Save the updated task
    const updatedTask = await task.save();

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});


module.exports = router;
