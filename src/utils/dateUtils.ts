/**
 * Formata valor de input de data com máscara DD/MM/AAAA
 */
export function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

/**
 * Converte string DD/MM/AAAA para ISO (YYYY-MM-DDTHH:MM:SS.sssZ)
 */
export function parseDateToISO(dateStr: string): string | undefined {
  if (!dateStr) return undefined;

  const [day, month, year] = dateStr.split("/");
  if (!day || !month || !year || year.length !== 4) return undefined;

  const d = parseInt(day, 10);
  const m = parseInt(month, 10) - 1; // mês 0‑indexed
  const y = parseInt(year, 10);

  if (d < 1 || d > 31 || m < 0 || m > 11 || isNaN(y)) return undefined;

  // Meio‑dia UTC para evitar problemas de fuso
  return `${year}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}T12:00:00.000Z`;
}

/**
 * Converte ISO string para exibição DD/MM/AAAA
 */
export function formatDateView(isoString: string): string {
  const [datePart] = isoString.split("T");
  if (!datePart) return "";
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return "";
  return `${day}/${month}/${year}`;
}