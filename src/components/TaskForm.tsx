import { useState } from "react";
import type { CreateTaskData } from "../types";
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

    function formatDueDate(value: string): string {
        // Remove tudo que não é dígito
        const digits = value.replace(/\D/g, "");
        
        // Aplica a máscara DD/MM/AAAA
        let formatted = "";
        if (digits.length <= 2) {
            formatted = digits;
        } else if (digits.length <= 4) {
            formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
        } else {
            formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
        }

        return formatted;
    }

    function handleDateChange(value: string) {
        setDueDate(formatDueDate(value));
        setDateError("");
    }

    function parseDateToISO(dateStr: string): string | undefined {
        if (!dateStr) return undefined;

        const [day, month, year] = dateStr.split("/");
        if (!day || !month || !year) {
            setDateError("Formato inválido. Use DD/MM/AAAA");
            return undefined;
        }

        const d = parseInt(day, 10);
        const m = parseInt(month, 10) - 1; // mês 0-indexed
        const y = parseInt(year, 10);

        // Validação básica
        if (d < 1 || d > 31) {
            setDateError("Dia inválido");
            return undefined;
        }
        if (m < 0 || m > 11) {
            setDateError("Mês inválido");
            return undefined;
        }
        if (year.length !== 4 || isNaN(y)) {
            setDateError("Ano inválido. Use 4 dígitos");
            return undefined;
        }

        // Constrói data como meio-dia UTC para evitar problemas de fuso
        return `${year}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}T12:00:00.000Z`;
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