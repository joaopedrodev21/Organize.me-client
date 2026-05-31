import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./AuthPage.css";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Email ou senha inválidos");
        }
    }
    return (
        <div className="auth-page min-h-screen px-4 py-10">
            <div className="auth-grid mx-auto w-full px-4">
                <section className="auth-panel">
                    <span className="auth-panel__badge">Organize.Me</span>
                    <h1 className="auth-panel__title">
                        Transforme seu fluxo de trabalho em resultados.
                    </h1>
                    <p className="auth-panel__copy">
                        Acesse suas tarefas com velocidade, mantenha o foco e evolua sua produtividade em uma interface simples e eficiente.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="auth-feature">
                            <div className="auth-feature__text">Painel intuitivo</div>
                        </div>
                        <div className="auth-feature">
                            <div className="auth-feature__text">Acesso rápido a tarefas</div>
                        </div>
                        <div className="auth-feature">
                            <div className="auth-feature__text">Visão clara do progresso</div>
                        </div>
                    </div>
                </section>

                <form onSubmit={handleSubmit} className="auth-card">
                    <div className="auth-card__content">
                        <h2 className="auth-card__title">Entrar</h2>
                        <p className="auth-card__subtitle">
                            Acesse sua conta para gerenciar tarefas e acompanhar o progresso do dia.
                        </p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <div className="auth-form">
                        <div className="auth-field">
                            <label>Email</label>
                            <input
                                className="auth-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label>Senha</label>
                            <input
                                className="auth-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="auth-button">
                            Entrar
                        </button>
                    </div>

                    <p className="auth-footer">
                        Não tem conta? <Link to="/register" className="auth-link">Cadastre-se</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}