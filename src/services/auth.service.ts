import api from './api';
import type { LoginResponse, User } from '../types';

export const authService = {
    async register(name: string, email: string, password: string): Promise<User> {
        const { data } = await api.post('/auth/register', { name, email, password });
        return data;
    }, 
    async login(email: string, password: string): Promise<LoginResponse> {
        const { data } = await api.post('/auth/login', { email, password });
        return data;
    },
    async forgotPassword(email: string): Promise<{ message: string }> {
        const { data } = await api.post('/auth/forgot-password', { email });
        return data;
    },
    async resetPassword(token: string, password: string): Promise<{ message: string }> {
        const { data } = await api.post('/auth/reset-password', { token, password });
        return data;
    }
}
