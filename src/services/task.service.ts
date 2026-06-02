import api from './api';
import type { Task, CreateTaskData, UpdateTaskData } from '../types';

export const taskService = {
    async getAll(params?:{
        page?: number;
        limit?: number;
        done?: string;
        priority?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Task[]> {
        const { data } = await api.get('/tasks', { params });
        // O servidor retorna { items: Task[], meta: {...} } (formato paginado)
        return Array.isArray(data) ? data : (data.items ?? []);
    }, 
    async getById(id: number): Promise<Task> {
        const { data } = await api.get(`/tasks/${id}`);
        return data;
    },
    async create(task: CreateTaskData): Promise<Task> {
        const { data } = await api.post('/tasks', task);
        return data;
    },
    async update(id: number, task: UpdateTaskData): Promise<Task> {
        const { data } = await api.put(`/tasks/${id}`, task);
        return data;
    },
    async delete(id: number): Promise<void> {
        await api.delete(`/tasks/${id}`);
    }
}