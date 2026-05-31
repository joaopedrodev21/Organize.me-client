import { Tag } from "lucide-react";
import '../styles/priority-stats.css';

interface PriorityStatsProps {
  high: number;
  low: number;
}

export function PriorityStats({ high, low }: PriorityStatsProps) {
  const total = high + low;
  const highPercent = total > 0 ? Math.round((high / total) * 100) : 0;
  const lowPercent = total > 0 ? 100 - highPercent : 0;

  const size = 140;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const highDash = (highPercent / 100) * circumference;
  const lowDash = (lowPercent / 100) * circumference;

  return (
    <div className="priority-stats">
      <div className="priority-stats__header">
        <span className="priority-stats__icon">
          <Tag size={16} strokeWidth={2.5} />
        </span>
        <h3 className="priority-stats__title">Prioridades</h3>
      </div>

      <div className="priority-stats__body">
        <div className="priority-stats__chart">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(30, 41, 59, 0.8)"
              strokeWidth={strokeWidth}
            />
            {high > 0 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#ef4444"
                strokeWidth={strokeWidth}
                strokeDasharray={`${highDash} ${circumference - highDash}`}
                strokeDashoffset={circumference / 4}
                strokeLinecap="round"
              />
            )}
            {low > 0 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#10b981"
                strokeWidth={strokeWidth}
                strokeDasharray={`${lowDash} ${circumference - lowDash}`}
                strokeDashoffset={circumference / 4 - highDash}
                strokeLinecap="round"
              />
            )}
          </svg>
          <div className="priority-stats__chart-center">
            <span className="priority-stats__chart-total">{total}</span>
          </div>
        </div>

        <div className="priority-stats__bars">
          <div className="priority-stats__bar-item">
            <div className="priority-stats__bar-header">
              <div className="priority-stats__bar-label">
                <span className="priority-stats__dot priority-stats__dot--high" />
                <span>Alta</span>
              </div>
              <span className="priority-stats__bar-value">{high} ({highPercent}%)</span>
            </div>
            <div className="priority-stats__bar-track">
              <div
                className="priority-stats__bar-fill priority-stats__bar-fill--high"
                style={{ width: `${highPercent}%` }}
              />
            </div>
          </div>

          <div className="priority-stats__bar-item">
            <div className="priority-stats__bar-header">
              <div className="priority-stats__bar-label">
                <span className="priority-stats__dot priority-stats__dot--low" />
                <span>Baixa</span>
              </div>
              <span className="priority-stats__bar-value">{low} ({lowPercent}%)</span>
            </div>
            <div className="priority-stats__bar-track">
              <div
                className="priority-stats__bar-fill priority-stats__bar-fill--low"
                style={{ width: `${lowPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}