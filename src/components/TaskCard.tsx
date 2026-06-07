import { useState } from "react";
import type { Task, UpdateTaskData } from "../types"
import { formatDate } from "../utils/formatDate";
import { formatDateInput, parseDateToISO as parseDateToISOShared, formatDateView as formatDateViewShared, isPastDate } from "../utils/dateUtils";
import { Trash2, Pencil, Calendar, AlertTriangle, ArrowUp, ArrowDown, CheckCircle2, Circle } from "lucide-react";
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
    const [description, setDescription] = useState(task.description || "");
    const [priority, setPriority] = useState<"LOW" | "HIGH">(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate ? formatDateView(task.dueDate) : "");
    const [dateError, setDateError] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    function formatDateView(isoString: string): string {
        return formatDateViewShared(isoString);
    }

    function parseDateToISO(dateStr: string): string | undefined {
        return parseDateToISOShared(dateStr);
    }

    function formatDueDateInput(value: string): string {
        return formatDateInput(value);
    }

    async function handleSave() {
        const updateData: UpdateTaskData = {};

        if (title.trim() && title !== task.title) updateData.title = title.trim();
        if (description !== (task.description || "")) updateData.description = description || null;

        const newPriority = priority;
        if (newPriority !== task.priority) updateData.priority = newPriority;

        const newDueDate = dueDate ? parseDateToISO(dueDate) : undefined;
        const oldDueDate = task.dueDate ? formatDateView(task.dueDate) : "";
        if (dueDate !== oldDueDate) updateData.dueDate = newDueDate || null;

        if (Object.keys(updateData).length > 0) {
            try {
                setIsUpdating(true);
                await onUpdate(updateData);
            } finally {
                setIsUpdating(false);
            }
        }
        setEditing(false);
    }

    function handleCancel() {
        setTitle(task.title);
        setDescription(task.description || "");
        setPriority(task.priority);
        setDueDate(task.dueDate ? formatDateView(task.dueDate) : "");
        setDateError("");
        setEditing(false);
    }

    function handleDateChange(value: string) {
        setDueDate(formatDueDateInput(value));
        setDateError("");
        // Valida se a data está no passado
        if (value.length === 10) {
            if (isPastDate(value)) {
                setDateError("A data de vencimento não pode estar no passado");
            }
        }
    }

    const dueDateFormatted = task.dueDate ? formatDate(task.dueDate) : null;
    const isOverdue = task.dueDate && !task.done && new Date(task.dueDate) < new Date();
    const createdDate = formatDate(task.createdAt);

    if (editing) {
        return (
            <div className="task-card task-card--editing">
                <div className="task-card__edit-form">
                    <div className="task-card__edit-field">
                        <label className="task-card__edit-label">Título</label>
                        <input
                            className="task-card__edit-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            disabled={isUpdating}
                        />
                    </div>

                    <div className="task-card__edit-field">
                        <label className="task-card__edit-label">Descrição</label>
                        <textarea
                            className="task-card__edit-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            disabled={isUpdating}
                        />
                    </div>

                    <div className="task-card__edit-row">
                        <div className="task-card__edit-field" style={{ flex: 1 }}>
                            <label className="task-card__edit-label">Data</label>
                            <input
                                className={`task-card__edit-input ${dateError ? 'task-card__edit-input--error' : ''}`}
                                placeholder="DD/MM/AAAA"
                                value={dueDate}
                                onChange={(e) => handleDateChange(e.target.value)}
                                maxLength={10}
                                disabled={isUpdating}
                            />
                            {dateError && <span className="task-card__edit-error">{dateError}</span>}
                        </div>
                        <div className="task-card__edit-field" style={{ flex: 1 }}>
                            <label className="task-card__edit-label">Prioridade</label>
                            <select
                                className="task-card__edit-select"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as "LOW" | "HIGH")}
                                disabled={isUpdating}
                            >
                                <option value="LOW">Normal</option>
                                <option value="HIGH">Alta</option>
                            </select>
                        </div>
                    </div>

                    <div className="task-card__edit-actions">
                        <button
                            type="button"
                            className="task-card__edit-save"
                            onClick={handleSave}
                            disabled={isUpdating || !title.trim()}
                        >
                            {isUpdating ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                            type="button"
                            className="task-card__edit-cancel"
                            onClick={handleCancel}
                            disabled={isUpdating}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                    <span className="task-card__box">
                        {task.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </span>
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
                <span
                    onClick={() => !task.done && setEditing(true)}
                    className={`task-card__title ${task.done ? 'task-card__title--done' : ''}`}
                    title="Clique para editar"
                >
                    {task.title}
                    {task.priority === "HIGH" && (
                        <span className="task-card__tag">
                            <ArrowUp size={12} />
                            Alta
                        </span>
                    )}
                    {task.priority === "LOW" && (
                        <span className="task-card__tag task-card__tag--low">
                            <ArrowDown size={12} />
                            Normal
                        </span>
                    )}
                </span>

                {task.description && (
                    <p className="task-card__description">{task.description}</p>
                )}

                <div className="task-card__meta">
                    {dueDateFormatted && (
                        <span className={isOverdue ? "task-card__overdue" : ""}>
                            <Calendar size={13} />
                            {' '}{dueDateFormatted}
                            {isOverdue && (
                                <>
                                    {' '}<AlertTriangle size={13} />
                                    {' '}Atrasada
                                </>
                            )}
                        </span>
                    )}
                    <span>{createdDate}</span>
                </div>

                <button
                    type="button"
                    className="task-card__edit-btn"
                    onClick={() => setEditing(true)}
                    title="Editar tarefa"
                >
                    <Pencil size={14} />
                </button>
            </div>

            <button
                type="button"
                onClick={onDelete}
                title="Deletar tarefa"
                disabled={isUpdating}
                className="task-card__delete"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}