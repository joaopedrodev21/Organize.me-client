import { useState } from "react";
import type { CreateTaskData } from "../types";
import { formatDateInput, parseDateToISO } from "../utils/dateUtils";
import '../styles/task-form.css';

interface Props {
    onSubmit: (data: CreateTaskData) => Promise<void>;
    onClose: () => void;
}

export function TaskForm({ onSubmit, onClose }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"LOW" | "HIGH">("LOW");
    const [dueDate, setDueDate] = useState("");
    const [dateError, setDateError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleDateChange(value: string) {
        setDueDate(formatDateInput(value));
        setDateError("");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        const isoDate = dueDate ? parseDateToISO(dueDate) : undefined;
        if (dueDate && !isoDate) return; // erro de validação, não envia
        
        try {
            setIsSubmitting(true);
            await onSubmit({
                title: title.trim(),
                description: description.trim() || undefined,
                priority,
                dueDate: isoDate,
            });
            setTitle("");
            setDescription("");
            setPriority("LOW");
            setDueDate("");
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="task-form__header">
                <h3 className="task-form__title">Nova Tarefa</h3>
                <button
                    type="button"
                    className="task-form__close"
                    onClick={onClose}
                    aria-label="Fechar formulário"
                >
                    ✕
                </button>
            </div>

            <div className="task-form__group">
                <label className="task-form__label">Título *</label>
                <input
                    className="task-form__input"
                    placeholder="O que você precisa fazer?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="task-form__group">
                <label className="task-form__label">Descrição</label>
                <textarea
                    className="task-form__textarea"
                    placeholder="Adicione mais detalhes (opcional)..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    disabled={isSubmitting}
                />
            </div>

            <div className="task-form__group">
                <label className="task-form__label">Data de Vencimento</label>
                <input
                    className={`task-form__input ${dateError ? 'task-form__input--error' : ''}`}
                    type="text"
                    placeholder="DD/MM/AAAA"
                    value={dueDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    maxLength={10}
                    disabled={isSubmitting}
                />
                {dateError && (
                    <span className="task-form__error">{dateError}</span>
                )}
            </div>

            <div className="task-form__group">
                <label className="task-form__label">Prioridade</label>
                <select
                    className="task-form__select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as "LOW" | "HIGH")}
                    disabled={isSubmitting}
                >
                    <option value="LOW">Normal</option>
                    <option value="HIGH">Alta Prioridade!</option>
                </select>
            </div>

            <div className="task-form__actions">
                <button
                    type="submit"
                    className="task-form__button task-form__button--primary"
                    disabled={isSubmitting || !title.trim()}
                >
                    {isSubmitting ? "Criando..." : "Criar Tarefa"}
                </button>
                <button
                    type="button"
                    className="task-form__button task-form__button--secondary"
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}