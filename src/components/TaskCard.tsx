import { useState } from "react";
import type { Task, UpdateTaskData } from "../types"
import { formatDate } from "../utils/formatDate";
import '../styles/task-card.css';

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
    const [showConfirm, setShowConfirm] = useState(false);

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

    const dueDate = task.dueDate ? formatDate(task.dueDate) : null;
    const createdDate = formatDate(task.createdAt);

    return (
        <div className={`task-card ${task.done ? 'task-card--done' : ''}`}>
            <div className="task-card__checkbox-wrapper">
                <label className="task-card__checkbox">
                    <input
                        type="checkbox"
                        checked={task.done}
                        onChange={(e) => {
                            if (e.target.checked && !task.done) {
                                setShowConfirm(true);
                            } else {
                                onToggle(e.target.checked);
                            }
                        }}
                        disabled={isUpdating}
                    />
                    <span className="task-card__box">{task.done ? '✓' : ''}</span>
                </label>
                {showConfirm && !task.done && (
                    <div className="task-card__confirm">
                        <span className="task-card__confirm-text">Concluir?</span>
                        <button
                            type="button"
                            className="task-card__confirm-yes"
                            onClick={() => { onToggle(true); setShowConfirm(false); }}
                        >
                            Sim
                        </button>
                        <button
                            type="button"
                            className="task-card__confirm-no"
                            onClick={() => setShowConfirm(false)}
                        >
                            Não
                        </button>
                    </div>
                )}
            </div>

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
                                Alta
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
                    <span>{createdDate}</span>
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