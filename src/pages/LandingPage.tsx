import { Link } from "react-router-dom";
import { LayoutDashboard, CheckSquare, BarChart3, Zap, Shield, Clock } from "lucide-react";
import "./LandingPage.css";

const features = [
  {
    icon: <LayoutDashboard size={22} />,
    title: "Painel intuitivo",
    desc: "Visualize todas as suas tarefas em um dashboard limpo e organizado, com informações claras sobre prazos e prioridades.",
  },
  {
    icon: <CheckSquare size={22} />,
    title: "Gerenciamento de tarefas",
    desc: "Crie, edite e organize tarefas com facilidade. Defina categorias, prioridades e acompanhe o status de cada uma.",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Acompanhamento de progresso",
    desc: "Monitore seu desempenho com métricas visuais. Veja quantas tarefas foram concluídas e identifique padrões de produtividade.",
  },
  {
    icon: <Zap size={22} />,
    title: "Alta performance",
    desc: "Interface rápida e responsiva desenvolvida com as tecnologias mais modernas para uma experiência fluida.",
  },
  {
    icon: <Shield size={22} />,
    title: "Segurança e privacidade",
    desc: "Seus dados são protegidos com autenticação segura e criptografia. Apenas você tem acesso às suas informações.",
  },
  {
    icon: <Clock size={22} />,
    title: "Calendário integrado",
    desc: "Visualize suas tarefas em uma visão mensal ou semanal. Nunca perca um prazo importante.",
  },
];

export function LandingPage() {
  return (
    <div className="landing-page">
      {/* ── Hero ── */}
      <header className="landing-hero">
        <div className="landing-hero__bg" />
        <nav className="landing-nav">
          <div className="landing-nav__inner">
            <span className="landing-nav__logo">Organize.Me</span>
            <div className="landing-nav__links">
              <Link to="/login" className="landing-nav__link">Entrar</Link>
              <Link to="/register" className="landing-nav__cta">Cadastrar</Link>
            </div>
          </div>
        </nav>

        <div className="landing-hero__content">
          <span className="landing-hero__badge">Plataforma de produtividade</span>
          <h1 className="landing-hero__title">
            Organize suas tarefas,<br />
            <span className="landing-hero__highlight">transforme seus resultados</span>
          </h1>
          <p className="landing-hero__copy">
            Uma ferramenta simples e poderosa para gerenciar suas tarefas diárias, 
            acompanhar seu progresso e aumentar sua produtividade — tudo em um só lugar.
          </p>
          <div className="landing-hero__actions">
            <Link to="/register" className="landing-btn landing-btn--primary">
              Começar grátis
            </Link>
            <Link to="/login" className="landing-btn landing-btn--ghost">
              Já tenho conta
            </Link>
          </div>
        </div>

        {/* Mockup / preview area */}
        <div className="landing-hero__visual">
          <div className="landing-hero__mockup">
            <div className="mockup-dots">
              <span /><span /><span />
            </div>
            <div className="mockup-line mockup-line--sm" />
            <div className="mockup-line mockup-line--lg" />
            <div className="mockup-line mockup-line--md" />
            <div className="mockup-line mockup-line--sm" />
            <div className="mockup-row">
              <div className="mockup-check" />
              <div className="mockup-line mockup-line--lg" />
            </div>
            <div className="mockup-row">
              <div className="mockup-check" />
              <div className="mockup-line mockup-line--md" />
            </div>
            <div className="mockup-bar" />
          </div>
        </div>
      </header>

      {/* ── Features ── */}
      <section className="landing-features" id="recursos">
        <div className="landing-features__inner">
          <h2 className="landing-section__title">Tudo que você precisa para organizar seu dia</h2>
          <p className="landing-section__subtitle">
            Ferramentas completas para transformar sua rotina de tarefas em resultados concretos.
          </p>

          <div className="landing-features__grid">
            {features.map((f, i) => (
              <div key={i} className="landing-feature-card">
                <div className="landing-feature-card__icon">{f.icon}</div>
                <h3 className="landing-feature-card__title">{f.title}</h3>
                <p className="landing-feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="landing-cta">
        <div className="landing-cta__inner">
          <h2 className="landing-section__title landing-section__title--light">
            Pronto para transformar sua produtividade?
          </h2>
          <p className="landing-section__subtitle landing-section__subtitle--light">
            Crie sua conta gratuitamente e comece a organizar suas tarefas em minutos.
          </p>
          <Link to="/register" className="landing-btn landing-btn--primary landing-btn--lg">
            Criar conta gratuita
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Organize.Me. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}