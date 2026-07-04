import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';

export const TOOL_SECTION_LABELS: Record<string, string> = {
  'calculator-finance': 'Calculator - Finance',
  clocks: 'Clocks',
  'data-csv': 'Data - CSV',
  'data-excel': 'Data - Excel',
  'data-json': 'Data - JSON',
  'data-xml': 'Data - XML',
  developer: 'Developer',
  editors: 'Editors',
  education: 'Education',
  'games-arcade': 'Game - Arcade',
  'games-casino': 'Game - Casino',
  'games-chess': 'Game - Chess',
  'games-memory': 'Game - Memory',
  'games-puzzle': 'Game - Puzzle',
  'games-trivia': 'Game - Trivia',
  'games-word': 'Game - Word',
  'health-vision': 'Health - Vision',
  image: 'Image',
  markdown: 'Markdown',
  pdf: 'PDF',
  'text-convert': 'Text - Convert',
  utilities: 'Utilities',
  video: 'Video',
  visualization: 'Visualization',
  write: 'Write',
};

export const getToolSectionDefs = (
  toolSections: Record<string, Tool[]>
): { label: string; items: Tool[] }[] =>
  Object.entries(TOOL_SECTION_LABELS).map(([key, label]) => ({
    label,
    items: toolSections[key] ?? [],
  }));
