export function formatDate(isoString: string): string {
  const [datePart] = isoString.split("T");
  if (!datePart) return isoString;
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return isoString;
  return `${day}/${month}/${year}`;
}