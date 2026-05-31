import { PieChart as PieChartIcon } from "lucide-react";

interface PieChartProps {
  completed: number;
  pending: number;
}

export function PieChart({ completed, pending }: PieChartProps) {
  const total = completed + pending;
  const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pendingPercent = total > 0 ? 100 - completedPercent : 0;

  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const completedDash = (completedPercent / 100) * circumference;
  const pendingDash = (pendingPercent / 100) * circumference;

  return (
    <div className="pie-chart">
      <div className="pie-chart__header">
        <span className="pie-chart__icon">
          <PieChartIcon size={16} strokeWidth={2.5} />
        </span>
        <h3 className="pie-chart__title">Status das Tarefas</h3>
      </div>

      <div className="pie-chart__body">
        <div className="pie-chart__svg-wrapper">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(30, 41, 59, 0.8)"
              strokeWidth={strokeWidth}
            />
            {/* Completed arc */}
            {completed > 0 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#22c55e"
                strokeWidth={strokeWidth}
                strokeDasharray={`${completedDash} ${circumference - completedDash}`}
                strokeDashoffset={circumference / 4}
                strokeLinecap="round"
                className="pie-chart__arc"
              />
            )}
            {/* Pending arc */}
            {pending > 0 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#f59e0b"
                strokeWidth={strokeWidth}
                strokeDasharray={`${pendingDash} ${circumference - pendingDash}`}
                strokeDashoffset={circumference / 4 - completedDash}
                strokeLinecap="round"
                className="pie-chart__arc"
              />
            )}
          </svg>
          <div className="pie-chart__center">
            <span className="pie-chart__total">{total}</span>
            <span className="pie-chart__label">Total</span>
          </div>
        </div>

        <div className="pie-chart__legend">
          <div className="pie-chart__legend-item">
            <div className="pie-chart__legend-color pie-chart__legend-color--completed" />
            <div className="pie-chart__legend-info">
              <span className="pie-chart__legend-name">Concluídas</span>
              <span className="pie-chart__legend-value">{completed} ({completedPercent}%)</span>
            </div>
          </div>
          <div className="pie-chart__legend-item">
            <div className="pie-chart__legend-color pie-chart__legend-color--pending" />
            <div className="pie-chart__legend-info">
              <span className="pie-chart__legend-name">Pendentes</span>
              <span className="pie-chart__legend-value">{pending} ({pendingPercent}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}