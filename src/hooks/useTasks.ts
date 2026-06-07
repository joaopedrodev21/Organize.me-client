import { useState, useCallback } from 'react';
import type { Task, CreateTaskData, UpdateTaskData} from '../types';
import { taskService } from '../services/task.service';
import axios from 'axios';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState<number | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [initialized, setInitialized] = useState(false);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try{
            const tasksData = await taskService.getAll();
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
    }, []);

    // Inicializa na primeira renderização
    if (!initialized) {
        setInitialized(true);
        fetchTasks();
    }

    async function createTask(data: CreateTaskData) {
        setCreating(true);
        try {
            await taskService.create(data);
            await fetchTasks();
        } finally {
            setCreating(false);
        }
    }

    async function updateTask(id: number, data: UpdateTaskData) {
        setUpdating(id);
        try {
            await taskService.update(id, data);
            await fetchTasks();
        } finally {
            setUpdating(null);
        }
    }

    async function deleteTask(id: number) {
        setDeleting(id);
        try {
            await taskService.delete(id);
            await fetchTasks();
        } finally {
            setDeleting(null);
        }
    }

    return {
        tasks,
        loading,
        error,
        creating,
        updating,
        deleting,
        createTask,
        updateTask,
        deleteTask,
    };
}