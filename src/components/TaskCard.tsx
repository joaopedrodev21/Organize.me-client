import { useState } from "react";
import type { Task, UpdateTaskData } from "../types"

interface Props {
    task: Task;
    onToggle: (done: boolean) => void;
    onDelete: () => void;
    onUpdate: (data: UpdateTaskData) => void;
}

export function TaskCard({ task, onToggle, onDelete, onUpdate }: Props) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [isUpdating, setIsUpdating] = useState(false);

    async function handleSave() {
        if(title.trim() && title !== task.title) {
            try {
                setIsUpdating(true);
                await onUpdate({ title });
            } finally {
                setIsUpdating(false);
            }
        }
        setEditing(false);
    }

    const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString('pt-BR') : null;
    const createdDate = new Date(task.createdAt).toLocaleDateString('pt-BR');

    return (
        <div className={`task-card ${task.done ? 'task-card--done' : ''}`}>
            <label className="task-card__checkbox">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={(e) => onToggle(e.target.checked)}
                    disabled={isUpdating}
                />
                <span className="task-card__box">{task.done ? '✓' : ''}</span>
            </label>

            <div className="task-card__content">
                {editing ? (
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") setEditing(false);
                        }}
                        autoFocus
                        className="task-form__input"
                        disabled={isUpdating}
                    />
                ) : (
                    <span
                        onClick={() => !task.done && setEditing(true)}
                        className={`task-card__title ${task.done ? 'task-card__title--done' : ''}`}
                        title="Clique para editar"
                    >
                        {task.title}
                        {task.priority === "HIGH" && (
                            <span className="task-card__tag">
                                🔥 Alta
                            </span>
                        )}
                    </span>
                )}

                {task.description && (
                    <p className="task-card__description">{task.description}</p>
                )}

                <div className="task-card__meta">
                    {dueDate && (
                        <span>📅 {dueDate}</span>
                    )}
                    <span>📌 {createdDate}</span>
                </div>
            </div>

            <button
                type="button"
                onClick={onDelete}
                title="Deletar tarefa"
                disabled={isUpdating}
                className="task-card__delete"
            >
                🗑️
            </button>
        </div>
    );
}