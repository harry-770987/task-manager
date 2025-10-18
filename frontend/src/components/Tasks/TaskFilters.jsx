import React from 'react';
import { Filter, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const TaskFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const { status, priority } = filters;

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Select value={status} onValueChange={(value) => onFilterChange('status', value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Status</SelectItem>
          <SelectItem value="Todo">Todo</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priority} onValueChange={(value) => onFilterChange('priority', value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Priority</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="High">High</SelectItem>
        </SelectContent>
      </Select>

      {/* Active Filters Display */}
      {(status || priority) && (
        <div className="flex flex-wrap gap-2 items-center">
          {status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {status}
              <button
                onClick={() => onFilterChange('status', '')}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {priority && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Priority: {priority}
              <button
                onClick={() => onFilterChange('priority', '')}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;
