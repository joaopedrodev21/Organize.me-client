import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";
import { TaskSection } from "../components/TaskSection";
import { TaskForm } from "../components/TaskForm";
import { TaskFilters, type PriorityFilter, type StatusTab } from "../components/TaskFilters";
import { PieChart } from "../components/PieChart";
import { PriorityStats } from "../components/PriorityStats";
import "./DashboardPage.css";
import { Flame, Pin, CheckCircle2, Plus } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import { useState, useMemo } from "react";

export function DashboardPage() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("ALL");
  const [statusTab, setStatusTab] = useState<StatusTab>("all");

  // Calcular estatísticas
  const completedTasks = tasks.filter(t => t.done).length;
  const pendingTasks = tasks.length - completedTasks;
  const productivity = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Aplicar filtros
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filtro por prioridade
    if (priorityFilter !== "ALL") {
      result = result.filter(t => t.priority === priorityFilter);
    }

    // Filtro por status (aba)
    if (statusTab === "pending") {
      result = result.filter(t => !t.done);
    } else if (statusTab === "completed") {
      result = result.filter(t => t.done);
    }

    return result;
  }, [tasks, priorityFilter, statusTab]);

  // Organizar tarefas filtradas
  const highPriorityPending = filteredTasks.filter(t => !t.done && t.priority === "HIGH");
  const lowPriorityPending = filteredTasks.filter(t => !t.done && t.priority === "LOW");
  const completedTasksList = filteredTasks.filter(t => t.done);

  const handleToggle = (id: number, done: boolean) => updateTask(id, { done });
  const handleUpdate = (id: number, data: any) => updateTask(id, data);

  const counts = {
    all: tasks.length,
    pending: pendingTasks,
    completed: completedTasks,
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <Sidebar tasks={tasks} />

        <div className="dashboard-main">
          <main>
            <DashboardHeader
              user={user}
              tasks={tasks}
            />
            <div className="dashboard-top-bar">
              <div />
              <button
                className="dashboard-button"
                onClick={() => setShowForm(!showForm)}
                type="button"
              >
                <Plus size={16} strokeWidth={2} />
                {showForm ? 'Fechar' : 'Nova tarefa'}
              </button>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-column">
                <section className="dashboard-card">
                  <div className="dashboard-card__top">
                    <div>
                      <span className="dashboard-tag">Painel de tarefas</span>
                      <h2 className="dashboard-title">Organize seu ritmo de trabalho</h2>
                      <p className="dashboard-description">Acompanhe prioridades, avance nas entregas e mantenha o controle do seu fluxo diário.</p>
                    </div>
                  </div>

                  <TaskFilters
                    priorityFilter={priorityFilter}
                    onPriorityChange={setPriorityFilter}
                    statusTab={statusTab}
                    onStatusTabChange={setStatusTab}
                    counts={counts}
                  />

                  {showForm && (
                    <div className="task-form">
                      <TaskForm onSubmit={createTask} onClose={() => setShowForm(false)} />
                    </div>
                  )}

                  {loading && <p className="dashboard-loading">Carregando tarefas...</p>}
                  {error && (
                    <p className="dashboard-error">{error}</p>
                  )}

                  {filteredTasks.length === 0 && !loading && (
                    <div className="dashboard-empty">
                      Nenhuma tarefa encontrada com os filtros atuais.
                    </div>
                  )}
                </section>

                <section className="dashboard-section">
                  <TaskSection
                    title="Alta Prioridade"
                    icon={<Flame size={18} />}
                    count={highPriorityPending.length}
                    tasks={highPriorityPending}
                    onToggle={handleToggle}
                    onDelete={deleteTask}
                    onUpdate={handleUpdate}
                  />
                  <TaskSection
                    title="Baixa Prioridade"
                    icon={<Pin size={18} />}
                    count={lowPriorityPending.length}
                    tasks={lowPriorityPending}
                    onToggle={handleToggle}
                    onDelete={deleteTask}
                    onUpdate={handleUpdate}
                  />
                  <TaskSection
                    title="Concluídas"
                    icon={<CheckCircle2 size={18} />}
                    count={completedTasksList.length}
                    tasks={completedTasksList}
                    completed
                    onToggle={handleToggle}
                    onDelete={deleteTask}
                    onUpdate={handleUpdate}
                  />
                </section>
              </div>

              <aside className="dashboard-column">
                <PieChart
                  completed={completedTasks}
                  pending={pendingTasks}
                />
                <PriorityStats
                  high={tasks.filter(t => t.priority === "HIGH").length}
                  low={tasks.filter(t => t.priority === "LOW").length}
                />
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}