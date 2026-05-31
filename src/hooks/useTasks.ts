import { useState, useEffect } from 'react';
import type { Task, CreateTaskData, UpdateTaskData} from '../types';
import { taskService } from '../services/task.service';
import axios from 'axios';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchTasks() {
        setLoading(true);
        setError(null);
        try{
            const result = await taskService.getAll();
            const tasksData = Array.isArray(result) ? result : result.data;
            setTasks(tasksData ?? []);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Erro ao buscar tarefas");
            } else {
                setError("Erro ao buscar tarefas");
            }
        } finally {
            setLoading(false);
        }
    }
    async function createTask(data: CreateTaskData) {
        await taskService.create(data);
        fetchTasks();
    }
    async function updateTask(id: number, data: UpdateTaskData) {
        await taskService.update(id, data);
        fetchTasks();
    }
    async function deleteTask(id: number) {
        await taskService.delete(id);
        fetchTasks();
    }
    useEffect(() => {
        fetchTasks();
    }, [])
    return { tasks, loading, error, createTask, updateTask, deleteTask };
}
