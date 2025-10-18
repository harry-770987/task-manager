import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiFlag, FiEdit3 } from 'react-icons/fi';
import { format } from 'date-fns';

const TaskForm = ({ task, onSubmit, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Todo',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        status: task.status || 'Todo',
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Todo',
        dueDate: '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 safe-area-padding">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 touch-target"
          >
            <FiX className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm touch-target"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm touch-target"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <div className="relative">
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-base sm:text-sm touch-target"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <FiFlag className="absolute right-3 top-3 sm:top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-base sm:text-sm touch-target"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <FiEdit3 className="absolute right-3 top-3 sm:top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm touch-target"
              />
              <FiCalendar className="absolute right-3 top-3 sm:top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-3 sm:py-2 text-base sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 btn-mobile"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-3 sm:py-2 text-base sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 btn-mobile"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
