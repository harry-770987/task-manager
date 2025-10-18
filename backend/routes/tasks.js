const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   GET /api/tasks
// @desc    Get all tasks for user
// @access  Private
router.get('/', getTasks);

// @route   GET /api/tasks/stats
// @desc    Get task statistics
// @access  Private
router.get('/stats', getTaskStats);

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', getTask);

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post('/', [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  body('status')
    .optional()
    .isIn(['Todo', 'In Progress', 'Completed'])
    .withMessage('Status must be Todo, In Progress, or Completed'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date')
], createTask);

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  body('status')
    .optional()
    .isIn(['Todo', 'In Progress', 'Completed'])
    .withMessage('Status must be Todo, In Progress, or Completed'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date')
], updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', deleteTask);

module.exports = router;
