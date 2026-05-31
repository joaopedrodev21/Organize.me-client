import { TaskCard } from "./TaskCard";
import type { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<Task>) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  if (tasks.length === 0) return null;

  return (
    <div className="task-section__list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={(done) => onToggle(task.id, done)}
          onDelete={() => onDelete(task.id)}
          onUpdate={(data) => onUpdate(task.id, data)}
        />
      ))}
    </div>
  );
}