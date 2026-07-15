import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../../../../types';

import {
  PiArrowsClockwise,
  PiBooks,
  PiBuildings,
  PiCalendar,
  PiChartBar,
  PiChatCircle,
  PiClipboard,
  PiClock,
  PiClockAfternoon,
  PiCurrencyDollar,
  PiDatabase,
  PiDivide,
  PiEyes,
  PiFileText,
  PiFilmStrip,
  PiFlag,
  PiGlobe,
  PiGraph,
  PiHandPeace,
  PiHourglass,
  PiImage,
  PiKey,
  PiLink,
  PiLock,
  PiMagnifyingGlass,
  PiMoney,
  PiMoon,
  PiNotePencil,
  PiNotebook,
  PiPaintBrush,
  PiPenNib,
  PiPencilLine,
  PiPianoKeys,
  PiPresentation,
  PiScissors,
  PiSmiley,
  PiSpiral,
  PiTimer,
  PiVideoCamera,
  PiWatch,
  PiWrench,
} from 'react-icons/pi';

export type CategoryMaker = (open: (id: ModalId) => () => void) => Tool[];

const makeCalculator: CategoryMaker = (open) => [
  {
    label: 'Calculator',
    description: 'Arithmetic + Unit Converter',
    tags: ['calculator', 'converter', 'arithmetic', 'unit-converter'],
    icon: PiDivide,
    onClick: open('calculator'),
  },
  {
    label: 'Inflation',
    description: 'Calculator',
    tags: ['finance', 'money', 'financial', 'math', 'arithmetic'],
    icon: PiMoney,
    onClick: open('inflation'),
  },
  {
    label: 'Split Bill',
    description: 'Calculator',
    tags: ['finance', 'money', 'financial', 'math', 'arithmetic'],
    icon: PiCurrencyDollar,
    onClick: open('split-bill'),
  },
  {
    label: 'Tax',
    description: 'Vietnam PIT',
    tags: ['finance', 'money', 'financial', 'calculator'],
    icon: PiFlag,
    onClick: open('tax'),
  },
];

const makeClocks: CategoryMaker = (open) => [
  {
    label: 'Countdown',
    description: 'Timer',
    tags: ['clock', 'world-clock', 'stopwatch', 'alarm'],
    icon: PiHourglass,
    onClick: open('countdown'),
  },
  {
    label: 'Cron',
    description: 'Expression Builder',
    tags: ['clock', 'time', 'world-clock'],
    icon: PiClockAfternoon,
    onClick: open('cron'),
  },
  {
    label: 'Days Count',
    description: 'Date Difference',
    tags: ['clock', 'time', 'date', 'difference'],
    icon: PiCalendar,
    onClick: open('days-count'),
  },
  {
    label: 'Epoch Convert',
    description: 'Timestamp',
    tags: ['clock', 'time', 'timestamp', 'unix', 'epoch'],
    icon: PiClock,
    onClick: open('epoch-convert'),
  },
  {
    label: 'Pomodoro',
    description: 'Timer',
    tags: ['clock', 'world-clock', 'countdown', 'stopwatch', 'alarm'],
    icon: PiTimer,
    onClick: open('pomodoro'),
  },
  {
    label: 'Watchface',
    description: 'Garmin',
    tags: [
      'clock',
      'time',
      'world-clock',
      'smartwatch',
      'watch-face',
      'clock-face',
    ],
    icon: PiWatch,
    onClick: open('watchface'),
  },
];

const makeDataCsv: CategoryMaker = (open) => [
  {
    label: 'CSV to Excel',
    description: 'Data',
    tags: ['spreadsheet', 'comma-separated', 'xlsx', 'xls', 'microsoft-excel'],
    icon: PiArrowsClockwise,
    onClick: open('csv-to-excel'),
  },
  {
    label: 'CSV to JSON',
    description: 'Data',
    tags: ['spreadsheet', 'comma-separated', 'javascript-object-notation'],
    icon: PiArrowsClockwise,
    onClick: open('csv-to-json'),
  },
  {
    label: 'CSV to XML',
    description: 'Data',
    tags: ['spreadsheet', 'comma-separated', 'markup'],
    icon: PiArrowsClockwise,
    onClick: open('csv-to-xml'),
  },
  {
    label: 'Split CSV',
    description: 'Data',
    tags: ['spreadsheet', 'comma-separated'],
    icon: PiScissors,
    onClick: open('split-csv'),
  },
];

const makeDataExcel: CategoryMaker = (open) => [
  {
    label: 'Excel to CSV',
    description: 'Data',
    tags: ['spreadsheet', 'xlsx', 'xls', 'microsoft-excel', 'comma-separated'],
    icon: PiArrowsClockwise,
    onClick: open('excel-to-csv'),
  },
  {
    label: 'Excel to PDF',
    description: 'Data',
    tags: [
      'spreadsheet',
      'xlsx',
      'xls',
      'microsoft-excel',
      'document',
      'adobe',
      'acrobat',
    ],
    icon: PiFileText,
    onClick: open('excel-to-pdf'),
  },
  {
    label: 'Excel to XML',
    description: 'Data',
    tags: ['spreadsheet', 'xlsx', 'xls', 'microsoft-excel', 'markup'],
    icon: PiArrowsClockwise,
    onClick: open('excel-to-xml'),
  },
  {
    label: 'Split Excel',
    description: 'Data',
    tags: ['spreadsheet', 'xlsx', 'xls', 'microsoft-excel'],
    icon: PiScissors,
    onClick: open('split-excel'),
  },
];

const makeDataJson: CategoryMaker = (open) => [
  {
    label: 'JSON to CSV',
    description: 'Data',
    tags: [
      'xml',
      'converter',
      'javascript-object-notation',
      'comma-separated',
      'spreadsheet',
    ],
    icon: PiArrowsClockwise,
    onClick: open('json-to-csv'),
  },
  {
    label: 'JSON to XML',
    description: 'Data',
    tags: ['converter', 'javascript-object-notation', 'markup'],
    icon: PiArrowsClockwise,
    onClick: open('json-to-xml'),
  },
];

const makeDataXml: CategoryMaker = (open) => [
  {
    label: 'XML to CSV',
    description: 'Data',
    tags: ['json', 'converter', 'markup', 'comma-separated', 'spreadsheet'],
    icon: PiArrowsClockwise,
    onClick: open('xml-to-csv'),
  },
  {
    label: 'XML to Excel',
    description: 'Data',
    tags: [
      'json',
      'converter',
      'markup',
      'xlsx',
      'xls',
      'spreadsheet',
      'microsoft-excel',
    ],
    icon: PiArrowsClockwise,
    onClick: open('xml-to-excel'),
  },
  {
    label: 'XML to JSON',
    description: 'Data',
    tags: ['converter', 'markup', 'javascript-object-notation'],
    icon: PiArrowsClockwise,
    onClick: open('xml-to-json'),
  },
];

const makeDeveloper: CategoryMaker = (open) => [
  {
    label: 'Diff',
    description: 'Text Comparison',
    tags: ['developer', 'programming', 'code', 'dev-tools'],
    icon: PiNotePencil,
    onClick: open('text-diff'),
  },
  {
    label: 'Figlet',
    description: 'Text art',
    tags: ['developer', 'programming', 'code', 'dev-tools'],
    icon: PiNotePencil,
    onClick: open('figlet'),
  },
  {
    label: 'IP',
    description: 'Inspector',
    tags: ['developer', 'programming', 'code', 'dev-tools'],
    icon: PiGlobe,
    onClick: open('ip'),
  },
  {
    label: 'OpenAPI',
    description: 'to Postman',
    tags: [
      'developer',
      'programming',
      'code',
      'dev-tools',
      'rest',
      'swagger',
      'specification',
    ],
    icon: PiArrowsClockwise,
    onClick: open('openapi'),
  },
  {
    label: 'Proxy',
    description: 'CORS Proxy',
    tags: ['developer', 'programming', 'code', 'dev-tools'],
    icon: PiLink,
    onClick: open('proxy'),
  },
  {
    label: 'Sheets',
    description: 'SQLite Browser',
    tags: [
      'developer',
      'programming',
      'code',
      'dev-tools',
      'spreadsheet',
      'excel',
      'google-sheets',
    ],
    icon: PiDatabase,
    onClick: open('sheets'),
  },
  {
    label: 'Shopify Detect',
    description: 'Detect Shopify',
    tags: ['developer', 'programming', 'code', 'dev-tools'],
    icon: PiMagnifyingGlass,
    onClick: open('shopify-detect'),
  },
  {
    label: 'SVG',
    description: 'Editor',
    tags: ['developer', 'programming', 'code', 'dev-tools', 'modify', 'change'],
    icon: PiPaintBrush,
    onClick: open('svg'),
  },
  {
    label: 'URL Tracer',
    description: 'Redirect Tracker',
    tags: ['developer', 'programming', 'code', 'dev-tools'],
    icon: PiLink,
    onClick: open('text-url-tracer'),
  },
  {
    label: 'UUID',
    description: 'Generator',
    tags: [
      'developer',
      'programming',
      'code',
      'dev-tools',
      'guid',
      'unique-id',
      'identifier',
      'create',
      'maker',
      'builder',
    ],
    icon: PiKey,
    onClick: open('uuid'),
  },
];

const makeEditors: CategoryMaker = (open) => [
  {
    label: 'JSON Schema',
    description: 'Validator',
    tags: ['editor', 'edit', 'text', 'javascript-object-notation', 'data'],
    icon: PiFileText,
    onClick: open('json-schema'),
  },
  {
    label: 'Manifest',
    description: 'JSON Editor',
    tags: ['text', 'javascript-object-notation', 'data', 'modify', 'change'],
    icon: PiFileText,
    onClick: open('manifest'),
  },
  {
    label: 'Markdown',
    description: 'Markdown Editor',
    tags: ['text', 'md', 'readme', 'markup', 'modify', 'change'],
    icon: PiFileText,
    onClick: open('markdown'),
  },
  {
    label: 'Redact',
    description: 'PDF Redactor',
    tags: ['editor', 'edit', 'text', 'document', 'adobe', 'acrobat'],
    icon: PiPenNib,
    onClick: open('redact'),
  },
  {
    label: 'Regex',
    description: 'Pattern Generator',
    tags: [
      'editor',
      'edit',
      'text',
      'regular-expression',
      'regexp',
      'create',
      'maker',
      'builder',
    ],
    icon: PiMagnifyingGlass,
    onClick: open('regex'),
  },
  {
    label: 'Resume',
    description: 'Resume Builder',
    tags: ['editor', 'edit', 'text'],
    icon: PiFileText,
    onClick: open('resume'),
  },
  {
    label: 'Slides',
    description: 'Pitch Deck',
    tags: [
      'editor',
      'edit',
      'text',
      'presentation',
      'powerpoint',
      'google-slides',
    ],
    icon: PiPresentation,
    onClick: open('slides'),
  },
  {
    label: 'Word Counter',
    description: 'Data',
    tags: ['utility', 'tool', 'docx', 'doc', 'microsoft-word', 'tally'],
    icon: PiNotePencil,
    onClick: open('word-counter'),
  },
];

const makeEducation: CategoryMaker = (open) => [
  {
    label: 'DOI',
    description: 'Cite',
    tags: [
      'education',
      'learning',
      'study',
      'academic',
      'digital-object-identifier',
      'citation',
    ],
    icon: PiFileText,
    onClick: open('doi'),
  },
  {
    label: 'English',
    description: 'Dictionary',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiBooks,
    onClick: open('english'),
  },
  {
    label: 'Flashcards',
    description: 'Words',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiNotebook,
    onClick: open('flashcards'),
  },
  {
    label: 'Periodic Table',
    description: 'Elements',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiChartBar,
    onClick: open('periodic-table'),
  },
  {
    label: 'Pitch',
    description: 'Training',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiPianoKeys,
    onClick: open('pitch'),
  },
  {
    label: 'Sign Language',
    description: 'Detection',
    tags: ['education', 'learning', 'study', 'academic'],
    icon: PiHandPeace,
    onClick: open('sign'),
  },
];

const makeHealthVision: CategoryMaker = (open) => [
  {
    label: 'LogMAR Chart',
    description: 'LogMAR Chart',
    tags: ['eyes', 'vision', 'eye-test', 'sight'],
    icon: PiEyes,
    onClick: open('logmar'),
  },
  {
    label: 'Snellen Chart',
    description: 'Snellen Chart',
    tags: ['eyes', 'vision', 'eye-test', 'sight'],
    icon: PiEyes,
    onClick: open('snellen'),
  },
  {
    label: 'Tumbling E Chart',
    description: 'Tumbling E Chart',
    tags: ['eyes', 'vision', 'eye-test', 'sight'],
    icon: PiEyes,
    onClick: open('tumbling-e'),
  },
];

const makeImage: CategoryMaker = (open) => [
  {
    label: 'Image Tools',
    description: 'Image',
    tags: [
      'image',
      'photo',
      'picture',
      'edit',
      'convert',
      'resize',
      'crop',
      'filter',
      'compress',
      'ai',
      'color',
      'ocr',
      'barcode',
      'qr',
      'meme',
      'collage',
    ],
    icon: PiImage,
    onClick: open('image'),
  },
];

const makeMarkdown: CategoryMaker = (open) => [
  {
    label: 'Markdown',
    description: 'Markdown',
    tags: ['markdown', 'editor', 'convert', 'html', 'pdf', 'docx', 'image'],
    icon: PiFileText,
    onClick: open('markdown'),
  },
];

const makePdf: CategoryMaker = (open) => [
  {
    label: 'PDF Tools',
    description: 'PDF',
    tags: [
      'pdf',
      'document',
      'adobe',
      'acrobat',
      'convert',
      'edit',
      'merge',
      'split',
      'compress',
      'ocr',
      'metadata',
    ],
    icon: PiFileText,
    onClick: open('pdf'),
  },
];

const makeTextConvert: CategoryMaker = (open) => [
  {
    label: 'Braille',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('braille'),
  },
  {
    label: 'Case',
    description: 'Converter',
    tags: [
      'developer',
      'programming',
      'code',
      'dev-tools',
      'transform',
      'change',
    ],
    icon: PiFileText,
    onClick: open('text-case'),
  },
  {
    label: 'Leet Speak',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('leetspeak'),
  },
  {
    label: 'Morse',
    description: '',
    tags: [],
    icon: PiWrench,
    onClick: open('morse'),
  },
];

const makeUtilities: CategoryMaker = (open) => [
  {
    label: 'Chat',
    description: 'AI Assistant',
    tags: ['utility', 'tool', 'productivity'],
    icon: PiChatCircle,
    onClick: open('chat'),
  },
  {
    label: 'Clipboard',
    description: 'Clipboard',
    tags: [
      'utility',
      'tool',
      'productivity',
      'copy',
      'paste',
      'clipboard-manager',
    ],
    icon: PiClipboard,
    onClick: open('clipboard'),
  },
  {
    label: 'Create ZIP',
    description: 'Data',
    tags: ['utility', 'tool'],
    icon: PiFileText,
    onClick: open('create-zip'),
  },
  {
    label: 'Emojis',
    description: 'Explorer',
    tags: ['utility', 'tool', 'productivity'],
    icon: PiSmiley,
    onClick: open('emojis'),
  },
  {
    label: 'Kaprekar',
    description: 'Routine',
    tags: ['utility', 'tool', 'productivity'],
    icon: PiChartBar,
    onClick: open('kaprekar'),
  },
  {
    label: 'Lorem Ipsum',
    description: 'Dummy text',
    tags: [
      'utility',
      'converter',
      'data',
      'placeholder',
      'dummy-text',
      'filler',
    ],
    icon: PiNotePencil,
    onClick: open('lorem-ipsum'),
  },
  {
    label: 'No Sleep',
    description: 'Timer',
    tags: [
      'utility',
      'tool',
      'productivity',
      'countdown',
      'stopwatch',
      'alarm',
    ],
    icon: PiMoon,
    onClick: open('no-sleep'),
  },
  {
    label: 'Password',
    description: 'Generator',
    tags: [
      'utility',
      'tool',
      'productivity',
      'secret',
      'strong',
      'create',
      'maker',
      'builder',
    ],
    icon: PiLock,
    onClick: open('text-password'),
  },
  {
    label: 'Screen Recorder',
    description: 'Record & Download',
    tags: ['utility', 'tool', 'productivity'],
    icon: PiFilmStrip,
    onClick: open('screen-recorder'),
  },
  {
    label: 'Word Count',
    description: 'Counter',
    tags: [
      'utility',
      'tool',
      'productivity',
      'docx',
      'doc',
      'microsoft-word',
      'tally',
    ],
    icon: PiChartBar,
    onClick: open('text-word-count'),
  },
];

const makeVideo: CategoryMaker = (open) => [
  {
    label: 'Video Tools',
    description: 'Video tools',
    tags: [
      'video',
      'convert',
      'edit',
      'download',
      'audio',
      'media',
      'mp4',
      'clip',
      'movie',
      'footage',
    ],
    icon: PiVideoCamera,
    onClick: open('video'),
  },
];

const makeVisualization: CategoryMaker = (open) => [
  {
    label: 'Attractors',
    description: 'Strange Attractors',
    tags: ['visualization', 'math', 'physics', '3d'],
    icon: PiSpiral,
    onClick: open('attractors'),
  },
  {
    label: 'Calendar Tracker',
    description: 'Activities',
    tags: [
      'chart',
      'graph',
      'visualization',
      'data',
      'date',
      'event',
      'schedule',
    ],
    icon: PiCalendar,
    onClick: open('calendar-tracker'),
  },
  {
    label: 'Graph',
    description: 'Force Layout',
    tags: ['chart', 'visualization', 'data'],
    icon: PiGraph,
    onClick: open('graph'),
  },
  {
    label: 'Legislation',
    description: 'Visualization',
    tags: ['chart', 'graph', 'data'],
    icon: PiBuildings,
    onClick: open('legislation'),
  },
  {
    label: 'Resume',
    description: 'Timeline',
    tags: ['chart', 'graph', 'visualization', 'data'],
    icon: PiHourglass,
    onClick: open('resume-timeline'),
  },
];

const makeWrite: CategoryMaker = (open) => [
  {
    label: 'Write Tools',
    description: 'Writing tools',
    tags: [
      'writing',
      'content',
      'edit',
      'translate',
      'social',
      'business',
      'copy',
      'rewrite',
    ],
    icon: PiPencilLine,
    onClick: open('write'),
  },
];

export const CATEGORY_MAKERS: Record<string, CategoryMaker> = {
  calculator: makeCalculator,
  clocks: makeClocks,
  'data-csv': makeDataCsv,
  'data-excel': makeDataExcel,
  'data-json': makeDataJson,
  'data-xml': makeDataXml,
  developer: makeDeveloper,
  editors: makeEditors,
  education: makeEducation,
  'health-vision': makeHealthVision,
  image: makeImage,
  markdown: makeMarkdown,
  pdf: makePdf,
  'text-convert': makeTextConvert,
  utilities: makeUtilities,
  video: makeVideo,
  visualization: makeVisualization,
  write: makeWrite,
};

export const makeTools = (
  open: (id: ModalId) => () => void
): Record<string, Tool[]> => {
  const result: Record<string, Tool[]> = {};
  for (const [key, make] of Object.entries(CATEGORY_MAKERS)) {
    const ids: ModalId[] = [];
    const trackOpen = (id: ModalId) => {
      ids.push(id);
      return open(id);
    };
    result[key] = make(trackOpen).map((t, i) => ({
      ...t,
      toolId: ids[i],
    }));
  }
  return result;
};
