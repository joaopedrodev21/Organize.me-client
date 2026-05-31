import { ClipboardList, CheckCircle2, Clock, Rocket } from "lucide-react";

interface StatsGridProps {
  total: number;
  completed: number;
  pending: number;
  productivity: number;
}

export function StatsGrid({ total, completed, pending, productivity }: StatsGridProps) {
  const stats = [
    {
      icon: ClipboardList,
      value: total,
      label: "Total de tarefas",
      description: "Todas as tarefas cadastradas",
      highlight: false,
    },
    {
      icon: CheckCircle2,
      value: completed,
      label: "Tarefas concluídas",
      description: "Finalizadas com sucesso",
      highlight: false,
    },
    {
      icon: Clock,
      value: pending,
      label: "Tarefas pendentes",
      description: "Aguardando conclusão",
      highlight: false,
    },
    {
      icon: Rocket,
      value: `${productivity}%`,
      label: "Progresso geral",
      description: "Percentual de conclusão",
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 p-4 bg-slate-900/95 border-b border-slate-800/80">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`flex flex-col items-center gap-2 rounded-2xl border border-slate-800/80 p-4 bg-slate-800/50 transition duration-200 hover:border-brand-500/30 hover:shadow-lg hover:-translate-y-0.5 ${
              stat.highlight ? "bg-brand-500/8 border-brand-500/25" : ""
            }`}
          >
            <span className="text-2xl text-brand-300">
              <Icon size={22} strokeWidth={2} />
            </span>
            <span className="text-xl font-extrabold text-slate-100">{stat.value}</span>
            <span className="text-xs uppercase tracking-[0.04em] font-bold text-slate-400 text-center">{stat.label}</span>
            <span className="text-sm text-slate-500 font-medium text-center">{stat.description}</span>
          </div>
        );
      })}
    </div>
  );
}