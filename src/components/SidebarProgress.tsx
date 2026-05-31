import { TrendingUp } from "lucide-react";
import type { Task } from "../types";

interface SidebarProgressProps {
  tasks: Task[];
}

export function SidebarProgress({ tasks }: SidebarProgressProps) {
  const completedTasks = tasks.filter(t => t.done).length;
  const progressPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="sidebar__progress">
      <div className="sidebar__progress-header">
        <span className="sidebar__progress-icon">
          <TrendingUp size={14} strokeWidth={2.5} />
        </span>
        <span className="sidebar__progress-title">Progresso</span>
        <span className="sidebar__progress-percent">{progressPercentage}%</span>
      </div>

      <div className="sidebar__progress-bar">
        <div
          className="sidebar__progress-fill"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <p className="sidebar__progress-text">
        {completedTasks} de {tasks.length} tarefas concluídas
      </p>
    </div>
  );
}