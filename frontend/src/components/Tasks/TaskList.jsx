import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Plus, Loader2, Search, Filter } from 'lucide-react';
import { tasksAPI } from '../../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const response = await tasksAPI.getTasks(params);
      setTasks(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await tasksAPI.createTask(taskData);
      setTasks([response.data.data, ...tasks]);
      setShowForm(false);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await tasksAPI.updateTask(taskData._id, taskData);
      setTasks(tasks.map(task => 
        task._id === taskData._id ? response.data.data : task
      ));
      setEditingTask(null);
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await tasksAPI.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      const response = await tasksAPI.updateTask(taskId, {
        ...task,
        status: newStatus,
      });
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data.data : task
      ));
      toast.success('Task status updated');
    } catch (error) {
      toast.error('Failed to update task status');
      console.error('Error updating task status:', error);
    }
  };

  const handleEditTask = async (task) => {
    // If it's an inline edit (task has _id), update directly
    if (task._id) {
      await handleUpdateTask(task);
    } else {
      // If it's a new task, show the form
      setEditingTask(task);
      setShowForm(true);
    }
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
            <p className="text-muted-foreground mt-2">Manage and organize your tasks</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
          <TaskFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <div className="text-muted-foreground mb-4">
                  <Plus className="h-16 w-16 mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {Object.values(filters).some(f => f) 
                    ? 'Try adjusting your filters to see more tasks.'
                    : 'Get started by creating your first task.'
                  }
                </p>
                {!Object.values(filters).some(f => f) && (
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Task
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>

        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isOpen={showForm}
        />
    </div>
  );
};

export default TaskList;
