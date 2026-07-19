export interface HighlightPart {
  text: string;
  highlight: boolean;
}

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getHighlightParts = (
  text: string,
  query: string
): HighlightPart[] => {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [{ text, highlight: false }];

  const pattern = terms.map(escapeRegExp).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts: HighlightPart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, index), highlight: false });
    }
    parts.push({ text: match[0], highlight: true });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), highlight: false });
  }
  return parts.length > 0 ? parts : [{ text, highlight: false }];
};
