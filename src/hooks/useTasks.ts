import { useState, useEffect } from 'react';
import type { Task, CreateTaskData, UpdateTaskData} from '../types';
import { taskService } from '../services/task.service';

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
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao buscar tarefas");
        } finally {
            setLoading(false);
        }
    }
    async function createTask(data: CreateTaskData) {
        await taskService.create(data);
        await fetchTasks();
    }
    async function updateTask(id: number, data: UpdateTaskData) {
        await taskService.update(id, data);
        await fetchTasks();
    }
    async function deleteTask(id: number) {
        await taskService.delete(id);
        await fetchTasks();
    }
    useEffect(() => {
        fetchTasks();
    }, [])
    return { tasks, loading, error, createTask, updateTask, deleteTask };
}