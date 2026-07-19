export const splitStatements = (sql: string): string[] => {
  const parts: string[] = [];
  let current = '';
  let inQuote: string | null = null;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (inQuote) {
      current += ch;
      if (ch === inQuote) inQuote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      inQuote = ch;
      current += ch;
      continue;
    }
    if (ch === ';') {
      if (current.trim()) parts.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
};
