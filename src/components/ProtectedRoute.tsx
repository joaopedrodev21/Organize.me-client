import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute ({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-shell">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

    if (!token) return <Navigate to="/login" replace />;

    return <>{children}</>;
}