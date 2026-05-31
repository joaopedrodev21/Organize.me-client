import { List, ArrowUp, ArrowDown } from "lucide-react";
import '../styles/task-filters.css';

export type PriorityFilter = "ALL" | "HIGH" | "LOW";
export type StatusTab = "all" | "pending" | "completed";

interface TaskFiltersProps {
  priorityFilter: PriorityFilter;
  onPriorityChange: (filter: PriorityFilter) => void;
  statusTab: StatusTab;
  onStatusTabChange: (tab: StatusTab) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

const priorities: { value: PriorityFilter; label: string; icon: typeof List }[] = [
  { value: "ALL", label: "Todas", icon: List },
  { value: "HIGH", label: "Alta", icon: ArrowUp },
  { value: "LOW", label: "Baixa", icon: ArrowDown },
];

const tabs: { value: StatusTab; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendentes" },
  { value: "completed", label: "Concluídas" },
];

export function TaskFilters({
  priorityFilter,
  onPriorityChange,
  statusTab,
  onStatusTabChange,
  counts,
}: TaskFiltersProps) {
  return (
    <div className="task-filters">
      <div className="task-filters__row">
        <span className="task-filters__label">Prioridade</span>
        <div className="task-filters__priority">
          {priorities.map((p) => {
            const Icon = p.icon;
            const active = priorityFilter === p.value;
            return (
              <button
                key={p.value}
                className={`task-filters__priority-button ${active ? 'task-filters__priority-button--active' : ''}`}
                onClick={() => onPriorityChange(p.value)}
                type="button"
              >
                <Icon size={14} strokeWidth={2.5} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="task-filters__status">
        {tabs.map((tab) => {
          const active = statusTab === tab.value;
          return (
            <button
              key={tab.value}
              className={`task-filters__status-button ${active ? 'task-filters__status-button--active' : ''}`}
              onClick={() => onStatusTabChange(tab.value)}
              type="button"
            >
              <span>{tab.label}</span>
              <span className="task-filters__count">({counts[tab.value]})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}