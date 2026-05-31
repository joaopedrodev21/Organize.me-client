import api from './api';
import type { User } from '../types';

export const userService = {
    async getMe(): Promise<User>{
        const response = await api.get('/users/me');
        return response.data;
    },
    async updateMe(data: { name?: string; email?: string }): Promise<User> {
        const { data: result }= await api.put('/users/me', data);
        return result;
    },
    async deleteMe(): Promise<void> {
        await api.delete('/users/me');
    }   
}