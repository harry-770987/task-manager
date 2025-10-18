import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getPriorityColor(priority) {
  switch (priority) {
    case "High":
      return "hsl(var(--priority-high))";
    case "Medium":
      return "hsl(var(--priority-medium))";
    case "Low":
      return "hsl(var(--priority-low))";
    default:
      return "hsl(var(--muted))";
  }
}

export function getStatusColor(status) {
  switch (status) {
    case "Completed":
      return "hsl(var(--status-completed))";
    case "In Progress":
      return "hsl(var(--status-in-progress))";
    case "Todo":
      return "hsl(var(--status-todo))";
    default:
      return "hsl(var(--muted))";
  }
}
