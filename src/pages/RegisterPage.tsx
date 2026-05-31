import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./AuthPage.css";

export function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        try {
            await register(name, email, password);
            navigate("/dashboard");
        }
        catch (err: any) {
            setError(err.response?.data?.message || "Erro ao cadastrar, tente novamente!");
        }
    }
    return (
        <div className="auth-page min-h-screen px-4 py-10">
            <div className="auth-grid mx-auto w-full px-4">
                <section className="auth-panel">
                    <span className="auth-panel__badge">Manager Tasks</span>
                    <h1 className="auth-panel__title">
                        Crie, priorize e conclua com confiança.
                    </h1>
                    <p className="auth-panel__copy">
                        Construa uma rotina produtiva com uma interface mais limpa, mais clara e mais rápida de usar.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="auth-feature">
                            <div className="auth-feature__icon">🧠</div>
                            <div className="auth-feature__text">Controle total das suas tarefas</div>
                        </div>
                        <div className="auth-feature">
                            <div className="auth-feature__icon">📅</div>
                            <div className="auth-feature__text">Organização simples e elegante</div>
                        </div>
                        <div className="auth-feature">
                            <div className="auth-feature__icon">🚀</div>
                            <div className="auth-feature__text">Resultados visíveis rapidamente</div>
                        </div>
                    </div>
                </section>

                <form onSubmit={handleSubmit} className="auth-card">
                    <div className="auth-card__header">
                        <h2 className="auth-card__title">Registrar</h2>
                        <p className="auth-card__subtitle">
                            Crie sua conta para começar a gerenciar tarefas imediatamente.
                        </p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <div className="auth-form">
                        <div className="auth-field">
                            <label>Nome</label>
                            <input
                                className="auth-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

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
                            Registrar
                        </button>
                    </div>

                    <div className="auth-card__footer">
                        <p className="auth-footer">
                            Já tem conta? <Link to="/login" className="auth-link">Entre aqui</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}