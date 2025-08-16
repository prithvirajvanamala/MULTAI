export const toCurrency = (n: number, currency = "GBP", locale = "en-GB") =>
  new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

export const daysAgo = (iso: string) => {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const diff = Math.max(0, Math.round((Date.now() - t) / 86400000));
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
};

export const uniq = (arr: (string | null | undefined)[]) =>
  Array.from(new Set((arr || []).filter(Boolean) as string[])).sort();

export const norm = (s?: string | null) => (s ?? "").toLowerCase();
