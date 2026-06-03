import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { authService } from "../services/auth.service";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import "./AuthPage.css";

export function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password.length < 8) {
            setError("A senha precisa ter no mínimo 8 caracteres");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        setLoading(true);
        try {
            await authService.resetPassword(token, password);
            navigate("/login?reset=success");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Erro ao redefinir senha");
            } else {
                setError("Erro ao redefinir senha");
            }
        } finally {
            setLoading(false);
        }
    }

    if (!token) {
        return (
            <div className="auth-page min-h-screen px-4 py-10">
                <div className="auth-grid mx-auto w-full px-4">
                    <div className="auth-card">
                        <div className="auth-card__content">
                            <h2 className="auth-card__title">Link inválido</h2>
                            <p className="auth-card__subtitle">
                                O link de redefinição de senha é inválido ou expirou. Solicite um novo link.
                            </p>
                        </div>
                        <p className="auth-footer">
                            <Link to="/forgot-password" className="auth-link">Solicitar novo link</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page min-h-screen px-4 py-10">
            <div className="auth-grid mx-auto w-full px-4">
                <section className="auth-panel">
                    <span className="auth-panel__badge">Organize.Me</span>
                    <h1 className="auth-panel__title">
                        Crie uma nova senha.
                    </h1>
                    <p className="auth-panel__copy">
                        Escolha uma senha forte para proteger sua conta.
                    </p>
                </section>

                <form onSubmit={handleSubmit} className="auth-card">
                    <div className="auth-card__content">
                        <h2 className="auth-card__title">Redefinir senha</h2>
                        <p className="auth-card__subtitle">
                            Digite sua nova senha.
                        </p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <div className="auth-form">
                        <div className="auth-field">
                            <label>Nova senha</label>
                            <div className="auth-password-wrapper">
                                <input
                                    className="auth-input"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mínimo 8 caracteres"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="auth-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="auth-field">
                            <label>Confirmar senha</label>
                            <div className="auth-password-wrapper">
                                <input
                                    className="auth-input"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Repita a senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? "Redefinindo..." : "Redefinir senha"}
                        </button>
                    </div>

                    <p className="auth-footer">
                        <Link to="/login" className="auth-link">← Voltar ao login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}