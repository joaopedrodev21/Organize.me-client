import { useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { useTasks } from "../hooks/useTasks";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import "../styles/dashboard-layout.css";
import "../styles/calendar.css";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function CalendarPage() {
  const { tasks } = useTasks();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const tasksByDate = useMemo(() => {
    const map = new Map<string, { title: string; priority: "LOW" | "HIGH"; done: boolean }[]>();
    tasks.forEach(task => {
      if (!task.dueDate) return;
      const dateKey = task.dueDate.split("T")[0];
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push({ title: task.title, priority: task.priority, done: task.done });
    });
    return map;
  }, [tasks]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const formatDateKey = (day: number) => {
    const m = String(currentMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${currentYear}-${m}-${d}`;
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [firstDayOfWeek, daysInMonth]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <Sidebar tasks={tasks} />

        <div className="dashboard-main">
          <main>
            <div className="dashboard-card" style={{ padding: "32px" }}>
              <div className="dashboard-card__top">
                <div>
                  <span className="dashboard-tag">Calendário</span>
                  <h2 className="dashboard-title">Tarefas por data</h2>
                  <p className="dashboard-description">
                    Visualize as tarefas com data de vencimento organizadas no calendário.
                  </p>
                </div>
              </div>

              {/* ── Calendar Navigation ── */}
              <div className="calendar-nav">
                <button type="button" className="calendar-nav__btn" onClick={prevMonth}>
                  <ChevronLeft size={18} />
                </button>
                <div className="calendar-nav__title">
                  <Calendar size={18} />
                  <span>{MONTHS[currentMonth]} {currentYear}</span>
                </div>
                <button type="button" className="calendar-nav__btn" onClick={nextMonth}>
                  <ChevronRight size={18} />
                </button>
                <button type="button" className="calendar-today-btn" onClick={goToToday}>
                  Hoje
                </button>
              </div>

              {/* ── Calendar Grid ── */}
              <div className="calendar-grid">
                {WEEKDAYS.map(day => (
                  <div key={day} className="calendar-weekday">{day}</div>
                ))}

                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="calendar-day calendar-day--empty" />;
                  }

                  const dateKey = formatDateKey(day);
                  const dayTasks = tasksByDate.get(dateKey) || [];
                  const hasHighPriority = dayTasks.some(t => t.priority === "HIGH" && !t.done);
                  const hasTasks = dayTasks.length > 0;
                  const allDone = dayTasks.length > 0 && dayTasks.every(t => t.done);

                  return (
                    <div
                      key={dateKey}
                      className={`calendar-day ${isToday(day) ? "calendar-day--today" : ""} ${
                        hasHighPriority ? "calendar-day--high" : ""
                      } ${allDone ? "calendar-day--done" : ""} ${
                        hasTasks && !hasHighPriority && !allDone ? "calendar-day--has-tasks" : ""
                      }`}
                    >
                      <span className="calendar-day__number">{day}</span>
                      {hasTasks && (
                        <div className="calendar-day__tasks">
                          {dayTasks.slice(0, 3).map((t, i) => (
                            <span
                              key={i}
                              className={`calendar-day__task-dot ${
                                t.priority === "HIGH" ? "calendar-day__task-dot--high" : "calendar-day__task-dot--low"
                              } ${t.done ? "calendar-day__task-dot--done" : ""}`}
                              title={t.title}
                            />
                          ))}
                          {dayTasks.length > 3 && (
                            <span className="calendar-day__more">+{dayTasks.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Task List for Selected Date ── */}
            <div className="dashboard-card" style={{ padding: "24px", marginTop: "24px" }}>
              <h3 className="dashboard-title" style={{ marginBottom: "16px", fontSize: "1rem" }}>
                Tarefas com data de vencimento
              </h3>
              {tasks.filter(t => t.dueDate).length === 0 ? (
                <div className="dashboard-empty">
                  Nenhuma tarefa com data de vencimento cadastrada.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {tasks
                    .filter(t => t.dueDate)
                    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
                    .map(task => {
                      const due = new Date(task.dueDate!).toLocaleDateString("pt-BR");
                      const isOverdue = !task.done && new Date(task.dueDate!) < new Date();
                      return (
                        <div
                          key={task.id}
                          className="calendar-task-item"
                          data-overdue={isOverdue}
                          data-done={task.done}
                        >
                          <span
                            className={`calendar-task-item__badge ${
                              task.priority === "HIGH" ? "calendar-task-item__badge--high" : "calendar-task-item__badge--low"
                            }`}
                          >
                            {task.priority === "HIGH" ? "Alta" : "Baixa"}
                          </span>
                          <span style={{ flex: 1, color: task.done ? "#64748b" : "#e2e8f0", textDecoration: task.done ? "line-through" : "none" }}>
                            {task.title}
                          </span>
                          <span style={{ color: isOverdue ? "#f87171" : "#64748b", fontSize: "0.82rem", fontWeight: 600 }}>
                            {due}
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}