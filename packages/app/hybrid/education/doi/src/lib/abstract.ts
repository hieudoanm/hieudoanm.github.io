const ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};

const decodeEntities = (value: string): string =>
  value.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (match) => ENTITY_MAP[match]);

const collapseWhitespace = (value: string): string =>
  value.replace(/\s+/g, ' ').trim();

export const sanitizeAbstract = (raw: string): string => {
  if (!raw) return '';
  const withoutTags = raw.replace(/<[^>]+>/g, ' ');
  return collapseWhitespace(decodeEntities(withoutTags));
};
