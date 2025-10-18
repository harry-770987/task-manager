const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    let query = { userId: req.user.id };

    // Add filters
    if (status) {
      query.status = status;
    }
    if (priority) {
      query.priority = priority;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks',
      error: error.message
    });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching task',
      error: error.message
    });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, priority, status, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating task',
      error: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, priority, status, dueDate } = req.body;
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description, priority, status, dueDate },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating task',
      error: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting task',
      error: error.message
    });
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalTasks = await Task.countDocuments({ userId });
    const completedTasks = await Task.countDocuments({ userId, status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ userId, status: { $in: ['Todo', 'In Progress'] } });
    
    const tasksByPriority = await Task.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    const tasksByStatus = await Task.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        tasksByPriority,
        tasksByStatus
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: error.message
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
};
