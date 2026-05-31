import type { ReactNode } from "react";
import { TaskCard } from "./TaskCard";
import type { Task } from "../types";
import '../styles/task-section.css';

interface TaskSectionProps {
  title: string;
  icon: ReactNode;
  count: number;
  tasks: Task[];
  completed?: boolean;
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<Task>) => void;
}

export function TaskSection({
  title,
  icon,
  count,
  tasks,
  completed = false,
  onToggle,
  onDelete,
  onUpdate,
}: TaskSectionProps) {
  if (tasks.length === 0) return null;

  return (
    <div className={`task-section ${completed ? 'task-section--completed' : ''}`}>
      <div className="task-section__header">
        <h3 className="task-section__title">
          <span className="task-section__icon">{icon}</span>
          {title}
        </h3>
        <span className="task-section__badge">{count}</span>
      </div>

      {tasks.length > 0 && (
        <div className="task-section__list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={(done: boolean) => onToggle(task.id, done)}
              onDelete={() => onDelete(task.id)}
              onUpdate={(data: Partial<Task>) => onUpdate(task.id, data)}
            />
          ))}
        </div>
      )}
    </div>
  );
}