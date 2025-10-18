import React, { useState } from 'react';
import { Pencil, Trash2, Calendar, AlertCircle, Save, X } from 'lucide-react';
import { format, isAfter, isBefore, isToday } from 'date-fns';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Input';
import { Textarea } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { getPriorityColor, getStatusColor } from '../../lib/utils';

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ''
  );

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    const today = new Date();
    
    if (isToday(date)) {
      return { text: 'Due today', color: 'text-orange-600' };
    } else if (isBefore(date, today)) {
      return { text: 'Overdue', color: 'text-red-600' };
    } else if (isAfter(date, today)) {
      return { text: format(date, 'MMM dd, yyyy'), color: 'text-muted-foreground' };
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      return;
    }

    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      status,
      dueDate: dueDate || null,
    };

    // Call the onEdit function which should handle the API call
    await onEdit(updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority);
    setStatus(task.status);
    setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '');
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';
  const dueDateStatus = getDueDateStatus(task.dueDate);

  return (
    <Card className="shadow-md hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: getPriorityColor(task.priority) }}>
      <CardContent className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${task._id}`}>Title</Label>
              <Input
                id={`title-${task._id}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${task._id}`}>Description</Label>
              <Textarea
                id={`description-${task._id}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`priority-${task._id}`}>Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`status-${task._id}`}>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`due-date-${task._id}`}>Due Date</Label>
                <Input
                  id={`due-date-${task._id}`}
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleUpdate} size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-1 truncate">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button onClick={() => onDelete(task._id)} variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Badge style={{ backgroundColor: getPriorityColor(task.priority), color: "white" }}>
                {task.priority}
              </Badge>
              <Badge style={{ backgroundColor: getStatusColor(task.status), color: "white" }}>
                {task.status}
              </Badge>
              {task.dueDate && (
                <div className={`flex items-center gap-1 text-sm ${isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                  {isOverdue && <AlertCircle className="h-4 w-4" />}
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                Created {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskItem;
