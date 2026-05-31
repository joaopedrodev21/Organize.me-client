import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if(savedToken) {
            setToken(savedToken);
            if(savedUser) {
                setUser(JSON.parse(savedUser));
                setLoading(false);
            } else {
                // Se não tem user salvo, busca da API
                userService.getMe()
                    .then(setUser)
                    .catch(() => {
                        localStorage.removeItem('token');
                        setToken(null);
                    })
                    .finally(() => setLoading(false));
            }
        } else {
            setLoading(false);
        }
    }, []);

    async function login(email: string, password: string) {
        const response = await authService.login(email, password);
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
    }

    async function register(name: string, email: string, password: string) {
        await authService.register(name, email, password);
        await login(email, password);
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
        {children}
        </AuthContext.Provider>
    );
}