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
    }
}