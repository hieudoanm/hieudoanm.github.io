import type { ComponentType } from 'react';
import { Tool } from '@hieudoanm.github.io/components/atoms';

export interface AppItem {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  toolId: string;
}

export interface AppSection {
  id: string;
  label: string;
  items: AppItem[];
}

import {
  PiArrowsClockwise,
  PiBooks,
  PiBrain,
  PiBuildings,
  PiCalendar,
  PiChartBar,
  PiClipboard,
  PiClock,
  PiClockAfternoon,
  PiCurrencyDollar,
  PiDivide,
  PiEyes,
  PiFileText,
  PiFilmStrip,
  PiFirstAidKit,
  PiFlag,
  PiGauge,
  PiGlobe,
  PiHandPeace,
  PiHeart,
  PiHeartStraight,
  PiHourglass,
  PiKey,
  PiLifebuoy,
  PiLink,
  PiMagnifyingGlass,
  PiMoney,
  PiMoon,
  PiNotePencil,
  PiNotebook,
  PiPianoKeys,
  PiPresentation,
  PiRocketLaunch,
  PiScissors,
  PiSmiley,
  PiSmileyMelting,
  PiSmileyNervous,
  PiSoccerBall,
  PiSparkle,
  PiSpiral,
  PiTimer,
  PiWatch,
  PiWrench,
} from 'react-icons/pi';

export const APP_SECTIONS: AppSection[] = [
  {
    label: 'Bored',
    id: 'bored',
    items: [
      {
        label: 'Research',
        description: 'Knowledge Explorer',
        icon: PiMagnifyingGlass,
        toolId: 'research',
      },
      {
        label: 'Develop',
        description: 'Skill Builder',
        icon: PiNotebook,
        toolId: 'develop',
      },
      {
        label: 'Build',
        description: 'Product Creator',
        icon: PiWrench,
        toolId: 'build',
      },
      {
        label: 'Ship',
        description: 'Infographic Publisher',
        icon: PiRocketLaunch,
        toolId: 'ship',
      },
      {
        label: 'VibeSlotCode',
        description: 'Stack + Idea Generator',
        icon: PiSparkle,
        toolId: 'vibe-slot-code',
      },
    ],
  },
  {
    label: 'Calculator',
    id: 'calculator',
    items: [
      {
        label: 'Calculator',
        description: 'Arithmetic + Unit Converter',
        icon: PiDivide,
        toolId: 'calculator',
      },
      {
        label: 'Inflation',
        description: 'Calculator',
        icon: PiMoney,
        toolId: 'inflation',
      },
      {
        label: 'Split Bill',
        description: 'Calculator',
        icon: PiCurrencyDollar,
        toolId: 'split-bill',
      },
      {
        label: 'Tax',
        description: 'Vietnam PIT',
        icon: PiFlag,
        toolId: 'tax',
      },
    ],
  },
  {
    label: 'Clocks',
    id: 'clocks',
    items: [
      {
        label: 'Countdown',
        description: 'Timer',
        icon: PiHourglass,
        toolId: 'countdown',
      },
      {
        label: 'Cron',
        description: 'Expression Builder',
        icon: PiClockAfternoon,
        toolId: 'cron',
      },
      {
        label: 'Days Count',
        description: 'Date Difference',
        icon: PiCalendar,
        toolId: 'days-count',
      },
      {
        label: 'Epoch Convert',
        description: 'Timestamp',
        icon: PiClock,
        toolId: 'epoch-convert',
      },
      {
        label: 'Pomodoro',
        description: 'Timer',
        icon: PiTimer,
        toolId: 'pomodoro',
      },
      {
        label: 'Watchface',
        description: 'Garmin',
        icon: PiWatch,
        toolId: 'watchface',
      },
    ],
  },
  {
    label: 'Data - CSV',
    id: 'data-csv',
    items: [
      {
        label: 'CSV to Excel',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'csv-to-excel',
      },
      {
        label: 'CSV to JSON',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'csv-to-json',
      },
      {
        label: 'CSV to XML',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'csv-to-xml',
      },
      {
        label: 'Split CSV',
        description: 'Data',
        icon: PiScissors,
        toolId: 'split-csv',
      },
    ],
  },
  {
    label: 'Data - Excel',
    id: 'data-excel',
    items: [
      {
        label: 'Excel to CSV',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'excel-to-csv',
      },
      {
        label: 'Excel to PDF',
        description: 'Data',
        icon: PiFileText,
        toolId: 'excel-to-pdf',
      },
      {
        label: 'Excel to XML',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'excel-to-xml',
      },
      {
        label: 'Split Excel',
        description: 'Data',
        icon: PiScissors,
        toolId: 'split-excel',
      },
    ],
  },
  {
    label: 'Data - JSON',
    id: 'data-json',
    items: [
      {
        label: 'JSON to CSV',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'json-to-csv',
      },
      {
        label: 'JSON to XML',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'json-to-xml',
      },
    ],
  },
  {
    label: 'Data - XML',
    id: 'data-xml',
    items: [
      {
        label: 'XML to CSV',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'xml-to-csv',
      },
      {
        label: 'XML to Excel',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'xml-to-excel',
      },
      {
        label: 'XML to JSON',
        description: 'Data',
        icon: PiArrowsClockwise,
        toolId: 'xml-to-json',
      },
    ],
  },
  {
    label: 'Developer',
    id: 'developer',
    items: [
      {
        label: 'Diff',
        description: 'Text Comparison',
        icon: PiNotePencil,
        toolId: 'text-diff',
      },
      {
        label: 'Figlet',
        description: 'Text art',
        icon: PiNotePencil,
        toolId: 'figlet',
      },
      {
        label: 'IP',
        description: 'Inspector',
        icon: PiGlobe,
        toolId: 'ip',
      },
      {
        label: 'OpenAPI',
        description: 'to Postman',
        icon: PiArrowsClockwise,
        toolId: 'openapi',
      },
      {
        label: 'Proxy',
        description: 'CORS Proxy',
        icon: PiLink,
        toolId: 'proxy',
      },
      {
        label: 'Shopify Detect',
        description: 'Detect Shopify',
        icon: PiMagnifyingGlass,
        toolId: 'shopify-detect',
      },
      {
        label: 'URL Tracer',
        description: 'Redirect Tracker',
        icon: PiLink,
        toolId: 'text-url-tracer',
      },
      {
        label: 'UUID',
        description: 'Generator',
        icon: PiKey,
        toolId: 'uuid',
      },
    ],
  },
  {
    label: 'Editors',
    id: 'editors',
    items: [
      {
        label: 'JSON Schema',
        description: 'Validator',
        icon: PiFileText,
        toolId: 'json-schema',
      },
      {
        label: 'Manifest',
        description: 'JSON Editor',
        icon: PiFileText,
        toolId: 'manifest',
      },
      {
        label: 'Regex',
        description: 'Pattern Generator',
        icon: PiMagnifyingGlass,
        toolId: 'regex',
      },
      {
        label: 'Resume',
        description: 'Resume Builder',
        icon: PiFileText,
        toolId: 'resume',
      },
      {
        label: 'Slides',
        description: 'Pitch Deck',
        icon: PiPresentation,
        toolId: 'slides',
      },
      {
        label: 'Word Counter',
        description: 'Data',
        icon: PiNotePencil,
        toolId: 'word-counter',
      },
    ],
  },
  {
    label: 'Education',
    id: 'education',
    items: [
      {
        label: 'DOI',
        description: 'Cite',
        icon: PiFileText,
        toolId: 'doi',
      },
      {
        label: 'English',
        description: 'Dictionary',
        icon: PiBooks,
        toolId: 'english',
      },
      {
        label: 'Flashcards',
        description: 'Words',
        icon: PiNotebook,
        toolId: 'flashcards',
      },
      {
        label: 'Periodic Table',
        description: 'Elements',
        icon: PiChartBar,
        toolId: 'periodic-table',
      },
      {
        label: 'Pitch',
        description: 'Training',
        icon: PiPianoKeys,
        toolId: 'pitch',
      },
      {
        label: 'Sign Language',
        description: 'Detection',
        icon: PiHandPeace,
        toolId: 'sign',
      },
    ],
  },
  {
    label: 'Health - Vision',
    id: 'health-vision',
    items: [
      {
        label: 'LogMAR Chart',
        description: 'LogMAR Chart',
        icon: PiEyes,
        toolId: 'logmar',
      },
      {
        label: 'Snellen Chart',
        description: 'Snellen Chart',
        icon: PiEyes,
        toolId: 'snellen',
      },
      {
        label: 'Tumbling E Chart',
        description: 'Tumbling E Chart',
        icon: PiEyes,
        toolId: 'tumbling-e',
      },
    ],
  },
  {
    label: 'Psychology',
    id: 'psychology',
    items: [
      {
        label: 'RCI',
        description: 'Relationship closeness',
        icon: PiHeart,
        toolId: 'relationship-closeness-inventory',
      },
      {
        label: 'ECR',
        description: 'Attachment styles',
        icon: PiHeartStraight,
        toolId: 'experiences-in-close-relationships',
      },
      {
        label: 'SWLS',
        description: 'Life satisfaction',
        icon: PiSmileyMelting,
        toolId: 'satisfaction-with-life',
      },
      {
        label: 'DAS',
        description: 'Relationship adjustment',
        icon: PiGauge,
        toolId: 'dyadic-adjustment-scale',
      },
      {
        label: 'BDI',
        description: 'Depression severity',
        icon: PiLifebuoy,
        toolId: 'beck-depression-inventory',
      },
      {
        label: 'GAD-7',
        description: 'Anxiety severity',
        icon: PiSmileyNervous,
        toolId: 'generalized-anxiety-disorder',
      },
      {
        label: 'PHQ-9',
        description: 'Depression screening',
        icon: PiFirstAidKit,
        toolId: 'patient-health-questionnaire',
      },
      {
        label: 'BFI',
        description: 'Personality traits',
        icon: PiBrain,
        toolId: 'big-five-inventory',
      },
    ],
  },
  {
    label: 'Text - Convert',
    id: 'text-convert',
    items: [
      {
        label: 'Braille',
        description: '',
        icon: PiWrench,
        toolId: 'braille',
      },
      {
        label: 'Case',
        description: 'Converter',
        icon: PiFileText,
        toolId: 'text-case',
      },
      {
        label: 'Leet Speak',
        description: '',
        icon: PiWrench,
        toolId: 'leetspeak',
      },
      {
        label: 'Morse',
        description: '',
        icon: PiWrench,
        toolId: 'morse',
      },
    ],
  },
  {
    label: 'Utilities',
    id: 'utilities',
    items: [
      {
        label: 'Clipboard',
        description: 'Clipboard',
        icon: PiClipboard,
        toolId: 'clipboard',
      },
      {
        label: 'Create ZIP',
        description: 'Data',
        icon: PiFileText,
        toolId: 'create-zip',
      },
      {
        label: 'Emojis',
        description: 'Explorer',
        icon: PiSmiley,
        toolId: 'emojis',
      },
      {
        label: 'Kaprekar',
        description: 'Routine',
        icon: PiChartBar,
        toolId: 'kaprekar',
      },
      {
        label: 'Lorem Ipsum',
        description: 'Dummy text',
        icon: PiNotePencil,
        toolId: 'lorem-ipsum',
      },
      {
        label: 'No Sleep',
        description: 'Timer',
        icon: PiMoon,
        toolId: 'no-sleep',
      },
      {
        label: 'Screen Recorder',
        description: 'Record & Download',
        icon: PiFilmStrip,
        toolId: 'screen-recorder',
      },
    ],
  },
  {
    label: 'Visualization',
    id: 'visualization',
    items: [
      {
        label: 'Attractors',
        description: 'Strange Attractors',
        icon: PiSpiral,
        toolId: 'attractors',
      },
      {
        label: 'Calendar Tracker',
        description: 'Activities',
        icon: PiCalendar,
        toolId: 'calendar-tracker',
      },
      {
        label: 'Football',
        description: 'Tournaments & data',
        icon: PiSoccerBall,
        toolId: 'football',
      },
      {
        label: 'Legislation',
        description: 'Visualization',
        icon: PiBuildings,
        toolId: 'legislation',
      },
      {
        label: 'Resume',
        description: 'Timeline',
        icon: PiHourglass,
        toolId: 'resume-timeline',
      },
    ],
  },
];

export const getAppSections = (): {
  id: string;
  label: string;
  items: Tool[];
}[] =>
  APP_SECTIONS.map(({ id, label, items }) => ({
    id,
    label,
    items: items.map((t) => ({
      label: t.label,
      description: t.description,
      icon: t.icon,
      href: `/apps/${id}/${t.toolId}`,
    })),
  }));
