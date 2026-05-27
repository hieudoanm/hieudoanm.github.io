import { AppCard } from '@hieudoanm.github.io/components/pages/start/cards/AppCard';
import { BookmarkCard } from '@hieudoanm.github.io/components/pages/start/cards/BookmarkCard';
import { DownloadCard } from '@hieudoanm.github.io/components/pages/start/cards/DownloadCard';
import {
  Tool,
  ToolCard,
} from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { CalculatorModal } from '@hieudoanm.github.io/components/pages/start/modals/calculators/CalculatorModal';
import { ConverterModal } from '@hieudoanm.github.io/components/pages/start/modals/calculators/ConverterModal';
import { EloModal } from '@hieudoanm.github.io/components/pages/start/modals/calculators/EloModal';
import { InflationModal } from '@hieudoanm.github.io/components/pages/start/modals/calculators/InflationModal';
import { PokerModal } from '@hieudoanm.github.io/components/pages/start/modals/calculators/PokerModal';
import { TaxModal } from '@hieudoanm.github.io/components/pages/start/modals/calculators/TaxModal';
import { ChessClockModal } from '@hieudoanm.github.io/components/pages/start/modals/clocks/ChessClockModal';
import { CountdownModal } from '@hieudoanm.github.io/components/pages/start/modals/clocks/CountdownModal';
import { PomodoroModal } from '@hieudoanm.github.io/components/pages/start/modals/clocks/PomodoroModal';
import { WatchFaceModal } from '@hieudoanm.github.io/components/pages/start/modals/clocks/WatchfaceModal';
import { BrailleModal } from '@hieudoanm.github.io/components/pages/start/modals/converters/BrailleModal';
import { ColorsModal } from '@hieudoanm.github.io/components/pages/start/modals/converters/ColorsModal';
import { MorseModal } from '@hieudoanm.github.io/components/pages/start/modals/converters/MorseModal';
import { OpenAPI2Postman } from '@hieudoanm.github.io/components/pages/start/modals/converters/OpenAPI2Postman';
import { JSONSchemaModal } from '@hieudoanm.github.io/components/pages/start/modals/editors/JSONSchemaModal';
import { ManifestModal } from '@hieudoanm.github.io/components/pages/start/modals/editors/ManifestModal';
import { MarkdownModal } from '@hieudoanm.github.io/components/pages/start/modals/editors/MarkdownModal';
import { ResumeModal } from '@hieudoanm.github.io/components/pages/start/modals/editors/ResumeModal';
import { SlidesModal } from '@hieudoanm.github.io/components/pages/start/modals/editors/SlidesModal';
import { DOIModal } from '@hieudoanm.github.io/components/pages/start/modals/education/academic/DOIModal';
import { PeriodicTableModal } from '@hieudoanm.github.io/components/pages/start/modals/education/chemistry/PeriodicTableModal';
import { LanguagesEnglishModal } from '@hieudoanm.github.io/components/pages/start/modals/education/languages/EnglishModal';
import { FlashcardsModal } from '@hieudoanm.github.io/components/pages/start/modals/education/languages/FlashcardsModal';
import { PitchModal } from '@hieudoanm.github.io/components/pages/start/modals/education/music/PitchModal';
import { LogMARChartModal } from '@hieudoanm.github.io/components/pages/start/modals/eyes/LogMARChartModal';
import { SnellenChartModal } from '@hieudoanm.github.io/components/pages/start/modals/eyes/SnellenChartModal';
import { TumblingEChartModal } from '@hieudoanm.github.io/components/pages/start/modals/eyes/TumblingEChartModal';
import { BlackjackModal } from '@hieudoanm.github.io/components/pages/start/modals/games/BlackjackModal';
import { PalindromeModal } from '@hieudoanm.github.io/components/pages/start/modals/games/PalindromeModal';
import { PiModal } from '@hieudoanm.github.io/components/pages/start/modals/games/PiNumberModal';
import { PokedexModal } from '@hieudoanm.github.io/components/pages/start/modals/games/PokedexModal';
import { QuizifyModal } from '@hieudoanm.github.io/components/pages/start/modals/games/QuizifyModal';
import { RecallModal } from '@hieudoanm.github.io/components/pages/start/modals/games/RecallModal';
import { T3Modal } from '@hieudoanm.github.io/components/pages/start/modals/games/T3Modal';
import { TowersModal } from '@hieudoanm.github.io/components/pages/start/modals/games/TowersModal';
import { TypoglycemiaModal } from '@hieudoanm.github.io/components/pages/start/modals/games/TypoglycemiaModal';
import { WordleModal } from '@hieudoanm.github.io/components/pages/start/modals/games/WordleModal';
import { BreakingBadModal } from '@hieudoanm.github.io/components/pages/start/modals/images/BreakingBadModal';
import { GitHubSocialPreviewModal } from '@hieudoanm.github.io/components/pages/start/modals/images/GitHubSocialPreviewModal';
import { HouseModal } from '@hieudoanm.github.io/components/pages/start/modals/images/HouseModal';
import { QRCodeModal } from '@hieudoanm.github.io/components/pages/start/modals/images/QRCodeModal';
import { YouTubeThumbnailsModal } from '@hieudoanm.github.io/components/pages/start/modals/images/YouTubeThumbnailsModal';
import { ChatModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/ChatModal/ChatModal';
import { ClipboardModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/ClipboardModal';
import { EmojisModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/EmojisModal';
import { FigletModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/FigletModal';
import { IPModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/IPModal';
import { KaprekarModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/KaprekarModal';
import { NoSleepModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/NoSleepModal';
import { ProxyModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/ProxyModal';
import { SVGModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/SVGModal';
import { ShopifyDetectModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/ShopifyDetectModal';
import { SheetsModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/SheetsModal';
import { StringModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/StringModal';
import { UUIDModal } from '@hieudoanm.github.io/components/pages/start/modals/tools/UUIDModal';
import { CalendarTrackerModal } from '@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker';
import { LegislationModal } from '@hieudoanm.github.io/components/pages/start/modals/visualization/LegislationModal';
import { LeftSidebar } from '@hieudoanm.github.io/components/pages/start/sidebars/LeftSidebar';
import { RightSidebar } from '@hieudoanm.github.io/components/pages/start/sidebars/RightSidebar';
import { apps } from '@hieudoanm.github.io/data/apps';
import {
  chat as chatBookmarks,
  code as codeBookmarks,
  google as googleBookmarks,
  messaging as messagingBookmarks,
  music as musicBookmarks,
  social as socialBookmarks,
  work as workBookmarks,
} from '@hieudoanm.github.io/data/bookmarks';
import {
  agents,
  clis,
  extensions,
  ides,
  packages,
} from '@hieudoanm.github.io/data/downloads';
import { getTimeInZone, timezones } from '@hieudoanm.github.io/data/timezones';
import {
  createSignal,
  createEffect,
  createMemo,
  lazy,
  onMount,
  onCleanup,
  Suspense,
  JSX,
} from 'solid-js';

/* ------------------------------------------------------------------ */
/* Dynamic Modals                                                        */
/* ------------------------------------------------------------------ */
const RedactModal = lazy(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/RedactModal')
);
const InstaSizeModal = lazy(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InstaSizeModal')
);
const InvoiceParserModal = lazy(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InvoiceParserModal')
);
const CameraModal = lazy(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/CameraModal')
);
const SignModal = lazy(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/SignModal')
);

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type ModalId =
  | 'blackjack'
  | 'braille'
  | 'breaking-bad'
  | 'calculator'
  | 'calendar-tracker'
  | 'camera'
  | 'chat'
  | 'chess-clock'
  | 'clipboard'
  | 'colors'
  | 'converter'
  | 'countdown'
  | 'doi'
  | 'elo'
  | 'emojis'
  | 'english'
  | 'figlet'
  | 'flashcards'
  | 'github-social-preview'
  | 'house'
  | 'inflation'
  | 'instasize'
  | 'invoice-parser'
  | 'ip'
  | 'json-schema'
  | 'kaprekar'
  | 'legislation'
  | 'logmar'
  | 'manifest'
  | 'markdown'
  | 'morse'
  | 'no-sleep'
  | 'openapi'
  | 'palindrome'
  | 'periodic-table'
  | 'pi'
  | 'pitch'
  | 'pokedex'
  | 'poker'
  | 'pomodoro'
  | 'proxy'
  | 'qr'
  | 'quizify'
  | 'recall'
  | 'redact'
  | 'resume'
  | 'sheets'
  | 'shopify-detect'
  | 'sign'
  | 'slides'
  | 'snellen'
  | 'string'
  | 'svg'
  | 't3'
  | 'tax'
  | 'towers'
  | 'tumbling-e'
  | 'typoglycemia'
  | 'uuid'
  | 'watchface'
  | 'wordle'
  | 'youtube-thumbnails';

type SidebarTab = 'tasks' | 'clock';

/* ------------------------------------------------------------------ */
/* Modal registry                                                       */
/* ------------------------------------------------------------------ */

const MODAL_MAP: Record<
  ModalId,
  (props: { onClose: () => void }) => JSX.Element
> = {
  blackjack: BlackjackModal,
  braille: BrailleModal,
  'breaking-bad': BreakingBadModal,
  calculator: CalculatorModal,
  'calendar-tracker': CalendarTrackerModal,
  camera: CameraModal,
  chat: ChatModal,
  'chess-clock': ChessClockModal,
  clipboard: ClipboardModal,
  colors: ColorsModal,
  converter: ConverterModal,
  countdown: CountdownModal,
  doi: DOIModal,
  elo: EloModal,
  emojis: EmojisModal,
  english: LanguagesEnglishModal,
  figlet: FigletModal,
  flashcards: FlashcardsModal,
  'github-social-preview': GitHubSocialPreviewModal,
  house: HouseModal,
  inflation: InflationModal,
  instasize: InstaSizeModal,
  'invoice-parser': InvoiceParserModal,
  ip: IPModal,
  'json-schema': JSONSchemaModal,
  kaprekar: KaprekarModal,
  legislation: LegislationModal,
  logmar: LogMARChartModal,
  manifest: ManifestModal,
  markdown: MarkdownModal,
  morse: MorseModal,
  'no-sleep': NoSleepModal,
  openapi: OpenAPI2Postman,
  palindrome: PalindromeModal,
  'periodic-table': PeriodicTableModal,
  pi: PiModal,
  pitch: PitchModal,
  pokedex: PokedexModal,
  poker: PokerModal,
  pomodoro: PomodoroModal,
  proxy: ProxyModal,
  qr: QRCodeModal,
  quizify: QuizifyModal,
  recall: RecallModal,
  redact: RedactModal,
  resume: ResumeModal,
  sheets: SheetsModal,
  'shopify-detect': ShopifyDetectModal,
  sign: SignModal,
  slides: SlidesModal,
  snellen: SnellenChartModal,
  string: StringModal,
  svg: SVGModal,
  t3: T3Modal,
  tax: TaxModal,
  towers: TowersModal,
  'tumbling-e': TumblingEChartModal,
  typoglycemia: TypoglycemiaModal,
  uuid: UUIDModal,
  watchface: WatchFaceModal,
  wordle: WordleModal,
  'youtube-thumbnails': YouTubeThumbnailsModal,
};

/* ------------------------------------------------------------------ */
/* Tool definitions                                                     */
/* ------------------------------------------------------------------ */

const makeTools = (
  open: (id: ModalId) => () => void
): Record<string, Tool[]> => ({
  tools: [
    {
      label: 'Chat',
      description: 'AI Assistant',
      emoji: '💬',
      color: '#3b82f6',
      onClick: open('chat'),
    },
    {
      label: 'Clipboard',
      description: 'Clipboard',
      emoji: '📋',
      color: '#3b82f6',
      onClick: open('clipboard'),
    },
    {
      label: 'Emojis',
      description: 'Explorer',
      emoji: '😀',
      color: '#f59e0b',
      onClick: open('emojis'),
    },
    {
      label: 'Figlet',
      description: 'Text art',
      emoji: '📝',
      color: '#8b5cf6',
      onClick: open('figlet'),
    },
    {
      label: 'IP',
      description: 'Inspector',
      emoji: '🌐',
      color: '#f59e0b',
      onClick: open('ip'),
    },
    {
      label: 'Kaprekar',
      description: 'Routine',
      emoji: '🔢',
      color: '#f59e0b',
      onClick: open('kaprekar'),
    },
    {
      label: 'No Sleep',
      description: 'Timer',
      emoji: '😴',
      color: '#3b82f6',
      onClick: open('no-sleep'),
    },
    {
      label: 'Proxy',
      description: 'CORS Proxy',
      emoji: '🔗',
      color: '#3b82f6',
      onClick: open('proxy'),
    },
    {
      label: 'Shopify Detect',
      description: 'Detect Shopify',
      emoji: '🔍',
      color: '#06b6d4',
      onClick: open('shopify-detect'),
    },
    {
      label: 'String',
      description: 'Formatter',
      emoji: '✏️',
      color: '#10b981',
      onClick: open('string'),
    },
    {
      label: 'SVG',
      description: 'Editor',
      emoji: '🎨',
      color: '#8b5cf6',
      onClick: open('svg'),
    },
    {
      label: 'UUID',
      description: 'Generator',
      emoji: '🔑',
      color: '#a855f7',
      onClick: open('uuid'),
    },
    {
      label: 'Sheets',
      description: 'SQLite Browser',
      emoji: '🗄️',
      color: '#3b82f6',
      onClick: open('sheets'),
    },
  ],
  calculators: [
    {
      label: 'Calculator',
      description: 'Math',
      emoji: '➗',
      color: '#8b5cf6',
      onClick: open('calculator'),
    },
    {
      label: 'Converter',
      description: 'Converter',
      emoji: '🔀',
      color: '#8b5cf6',
      onClick: open('converter'),
    },
    {
      label: 'Elo',
      description: 'Calculator',
      emoji: '♟️',
      color: '#f59e0b',
      onClick: open('elo'),
    },
    {
      label: 'Inflation',
      description: 'Calculator',
      emoji: '💰',
      color: '#f59e0b',
      onClick: open('inflation'),
    },
    {
      label: 'Poker',
      description: 'Odds Calculator',
      emoji: '🃏',
      color: '#f59e0b',
      onClick: open('poker'),
    },
    {
      label: 'Tax',
      description: 'Vietnam PIT',
      emoji: '🇻🇳',
      color: '#ef4444',
      onClick: open('tax'),
    },
  ],
  clocks: [
    {
      label: 'Chess Clock',
      description: 'Chess Timer',
      emoji: '♟️',
      color: '#8b5cf6',
      onClick: open('chess-clock'),
    },
    {
      label: 'Countdown',
      description: 'Timer',
      emoji: '⏳',
      color: '#06b6d4',
      onClick: open('countdown'),
    },
    {
      label: 'Pomodoro',
      description: 'Timer',
      emoji: '🍅',
      color: '#ef4444',
      onClick: open('pomodoro'),
    },
    {
      label: 'Watchface',
      description: 'Garmin',
      emoji: '⌚',
      color: '#ef4444',
      onClick: open('watchface'),
    },
  ],
  converters: [
    {
      label: 'Braille',
      description: 'From Text',
      emoji: '⠿',
      color: '#8b5cf6',
      onClick: open('braille'),
    },
    {
      label: 'Colors',
      description: 'From HEX',
      emoji: '🎨',
      color: '#ec4899',
      onClick: open('colors'),
    },
    {
      label: 'Morse Code',
      description: 'From Text',
      emoji: '🔣',
      color: '#f59e0b',
      onClick: open('morse'),
    },
    {
      label: 'OpenAPI',
      description: 'to Postman',
      emoji: '🔄',
      color: '#ff6c37',
      onClick: open('openapi'),
    },
  ],
  editors: [
    {
      label: 'JSON Schema',
      description: 'Validator',
      emoji: '📄',
      color: '#3b82f6',
      onClick: open('json-schema'),
    },
    {
      label: 'Manifest',
      description: 'JSON Editor',
      emoji: '📄',
      color: '#3b82f6',
      onClick: open('manifest'),
    },
    {
      label: 'Markdown',
      description: 'Markdown Editor',
      emoji: '📄',
      color: '#3b82f6',
      onClick: open('markdown'),
    },
    {
      label: 'Resume',
      description: 'Resume Builder',
      emoji: '📄',
      color: '#3b82f6',
      onClick: open('resume'),
    },
    {
      label: 'Redact',
      description: 'PDF Redactor',
      emoji: '🖋️',
      color: '#3b82f6',
      onClick: open('redact'),
    },
    {
      label: 'Slides',
      description: 'Pitch Deck',
      emoji: '📽️',
      color: '#3b82f6',
      onClick: open('slides'),
    },
  ],
  education: [
    {
      label: 'English',
      description: 'Dictionary',
      emoji: '📚',
      color: '#3b82f6',
      onClick: open('english'),
    },
    {
      label: 'Flashcards',
      description: 'Words',
      emoji: '📓',
      color: '#fefefe',
      onClick: open('flashcards'),
    },
    {
      label: 'Sign Language',
      description: 'Detection',
      emoji: '🤟',
      color: '#3b82f6',
      onClick: open('sign'),
    },
    {
      label: 'Periodic Table',
      description: 'Elements',
      emoji: '📊',
      color: '#f59e0b',
      onClick: open('periodic-table'),
    },
    {
      label: 'Pitch',
      description: 'Training',
      emoji: '🎹',
      color: '#8b5cf6',
      onClick: open('pitch'),
    },
    {
      label: 'DOI',
      description: 'Cite',
      emoji: '📄',
      color: '#3b82f6',
      onClick: open('doi'),
    },
  ],
  eyes: [
    {
      label: 'LogMAR Chart',
      description: 'LogMAR Chart',
      emoji: '👀',
      color: '#3b82f6',
      onClick: open('logmar'),
    },
    {
      label: 'Snellen Chart',
      description: 'Snellen Chart',
      emoji: '👀',
      color: '#3b82f6',
      onClick: open('snellen'),
    },
    {
      label: 'Tumbling E Chart',
      description: 'Tumbling E Chart',
      emoji: '👀',
      color: '#3b82f6',
      onClick: open('tumbling-e'),
    },
  ],
  games: [
    {
      label: 'Blackjack',
      description: 'Cards Counter',
      emoji: '🃏',
      color: '#f59e0b',
      onClick: open('blackjack'),
    },
    {
      label: 'Palindrome',
      description: 'Palindrome',
      emoji: '🔁',
      color: '#f59e0b',
      onClick: open('palindrome'),
    },
    {
      label: 'PI',
      description: 'Memorization',
      emoji: 'π',
      color: '#f59e0b',
      onClick: open('pi'),
    },
    {
      label: 'Pokedex',
      description: 'Pokemon',
      emoji: '📕',
      color: '#f59e0b',
      onClick: open('pokedex'),
    },
    {
      label: 'Quizify',
      description: 'Quiz',
      emoji: '❓',
      color: '#f59e0b',
      onClick: open('quizify'),
    },
    {
      label: 'Recall',
      description: 'Memorization',
      emoji: '🔣',
      color: '#f59e0b',
      onClick: open('recall'),
    },
    {
      label: 'T3',
      description: 'Tic-Tac-Toe',
      emoji: '❌',
      color: '#f59e0b',
      onClick: open('t3'),
    },
    {
      label: 'Towers',
      description: 'Towers of Hanoi',
      emoji: '🗼',
      color: '#f59e0b',
      onClick: open('towers'),
    },
    {
      label: 'Typoglycemia',
      description: 'Scrambled text',
      emoji: '🔀',
      color: '#f59e0b',
      onClick: open('typoglycemia'),
    },
    {
      label: 'Wordle',
      description: 'Guess the word',
      emoji: '🟩',
      color: '#f59e0b',
      onClick: open('wordle'),
    },
  ],
  images: [
    {
      label: 'Breaking Bad',
      description: 'Element',
      emoji: '🧪',
      color: '#eab308',
      onClick: open('breaking-bad'),
    },
    {
      label: 'Camera',
      description: 'Composition',
      emoji: '📸',
      color: '#ef4444',
      onClick: open('camera'),
    },
    {
      label: 'Social Preview',
      description: 'GitHub',
      emoji: '📸',
      color: '#10b981',
      onClick: open('github-social-preview'),
    },
    {
      label: 'House',
      description: 'M.D.',
      emoji: '🏥',
      color: '#ef4444',
      onClick: open('house'),
    },
    {
      label: 'InstaSize',
      description: 'Square Fit',
      emoji: '📸',
      color: '#3b82f6',
      onClick: open('instasize'),
    },
    {
      label: 'Invoice Parser',
      description: 'OCR',
      emoji: '📄',
      color: '#ef4444',
      onClick: open('invoice-parser'),
    },
    {
      label: 'QR Code',
      description: 'Generator',
      emoji: '▦',
      color: '#22d3ee',
      onClick: open('qr'),
    },
    {
      label: 'Thumbnails',
      description: 'YouTube',
      emoji: '📸',
      color: '#22d3ee',
      onClick: open('youtube-thumbnails'),
    },
  ],
  visualization: [
    {
      label: 'Calendar Tracker',
      description: 'Activities',
      emoji: '📅',
      color: '#10b981',
      onClick: open('calendar-tracker'),
    },
    {
      label: 'Legislation',
      description: 'Visualization',
      emoji: '🏛️',
      color: '#ef4444',
      onClick: open('legislation'),
    },
  ],
});

/* ------------------------------------------------------------------ */
/* Filter helper                                                        */
/* ------------------------------------------------------------------ */

const match = (label: string, q: string) =>
  label.toLowerCase().includes(q.toLowerCase());

/* ------------------------------------------------------------------ */
/* SearchBar                                                            */
/* ------------------------------------------------------------------ */

const SearchBar = (props: { query: string; onChange: (v: string) => void }) => {
  let inputRef: HTMLInputElement | undefined;

  const googleSearch = () => {
    if (!props.query.trim()) return;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(props.query.trim())}`,
      '_blank'
    );
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') googleSearch();
  };

  return (
    <div class="join w-full">
      <input
        ref={inputRef}
        type="text"
        value={props.query}
        onChange={(e) => props.onChange((e.target as HTMLInputElement).value)}
        onKeyDown={onKeyDown}
        placeholder="Search or filter\u2026"
        class="input input-bordered join-item w-full"
      />
      <button
        class="btn join-item btn-neutral"
        onClick={googleSearch}
        aria-label="Search with Google">
        🔍
      </button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

const Section = (props: {
  label: string;
  count?: number;
  children: JSX.Element;
}) => (
  <section aria-label={props.label} class="mt-10 w-full max-w-2xl">
    <p class="text-base-content/30 mb-4 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
      {props.label}
      {props.count !== undefined && (
        <span class="badge badge-xs badge-neutral font-mono tracking-normal normal-case">
          {props.count}
        </span>
      )}
    </p>
    {props.children}
  </section>
);

/* ------------------------------------------------------------------ */
/* ToolGrid — shared grid wrapper                                      */
/* ------------------------------------------------------------------ */

const GRID =
  'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3';
const GRID_MOBILE = 'grid grid-cols-2 sm:grid-cols-3 gap-3';

/* ------------------------------------------------------------------ */
/* MainContent                                                          */
/* ------------------------------------------------------------------ */

type MainTab = 'bookmarks' | 'downloads' | 'tools' | 'apps';

const MainContent = (props: {
  today: string;
  query: string;
  onQueryChange: (v: string) => void;
  toolSections: ReturnType<typeof makeTools>;
}) => {
  const [tab, setTab] = createSignal<MainTab>('bookmarks');

  const {
    tools,
    calculators,
    clocks,
    converters,
    editors,
    education,
    eyes,
    games,
    images,
    visualization,
  } = props.toolSections;

  const bookmarkSections = [
    { label: 'Chatbot', items: chatBookmarks },
    { label: 'Code', items: codeBookmarks },
    { label: 'Google Workspace', items: googleBookmarks },
    { label: 'Messaging', items: messagingBookmarks },
    { label: 'Music', items: musicBookmarks },
    { label: 'Social', items: socialBookmarks },
    { label: 'Work', items: workBookmarks },
  ];

  const toolSectionDefs = [
    { label: 'Tools', items: tools },
    { label: 'Calculators', items: calculators },
    { label: 'Clocks', items: clocks },
    { label: 'Converters', items: converters },
    { label: 'Editors', items: editors },
    { label: 'Education', items: education },
    { label: 'Eyes', items: eyes },
    { label: 'Games', items: games },
    { label: 'Images', items: images },
    { label: 'Visualization', items: visualization },
  ];

  const downloadSections = [
    { label: 'Agents', items: agents },
    { label: 'CLIs', items: clis },
    { label: 'Extensions', items: extensions },
    { label: 'IDEs', items: ides },
    { label: 'Packages', items: packages },
  ];

  const appSections = [{ label: 'Apps', items: apps }];

  const filtering = createMemo(() => props.query.trim().length > 0);

  const filteredBookmarks = createMemo(() =>
    bookmarkSections.map((s) => ({
      ...s,
      filtered: filtering()
        ? s.items.filter((b) => match(b.label, props.query))
        : s.items,
    }))
  );

  const filteredTools = createMemo(() =>
    toolSectionDefs.map((s) => ({
      ...s,
      filtered: filtering()
        ? s.items.filter((t) => match(t.label, props.query))
        : s.items,
    }))
  );

  const filteredDownloads = createMemo(() =>
    downloadSections.map((s) => ({
      ...s,
      filtered: filtering()
        ? s.items.filter((a) => match(a.id, props.query))
        : s.items,
    }))
  );

  const filteredApps = createMemo(() =>
    appSections.map((s) => ({
      ...s,
      filtered: filtering()
        ? s.items.filter((a) => match(a.id, props.query))
        : s.items,
    }))
  );

  createEffect(() => {
    if (!filtering()) return;
    const hasTools = filteredTools().some((s) => s.filtered.length > 0);
    const hasBookmarks = filteredBookmarks().some((s) => s.filtered.length > 0);
    const hasDownloads = filteredDownloads().some((s) => s.filtered.length > 0);
    const hasApps = filteredApps().some((s) => s.filtered.length > 0);
    if (tab() === 'tools' && !hasTools && hasBookmarks) setTab('bookmarks');
    else if (tab() === 'bookmarks' && !hasBookmarks && hasTools)
      setTab('tools');
    else if (tab() === 'downloads' && !hasDownloads && hasTools)
      setTab('tools');
    else if (tab() === 'apps' && !hasApps && hasTools) setTab('tools');
  });

  const hasAnyResult = createMemo(
    () =>
      filteredBookmarks().some((s) => s.filtered.length > 0) ||
      filteredTools().some((s) => s.filtered.length > 0) ||
      filteredDownloads().some((s) => s.filtered.length > 0) ||
      filteredApps().some((s) => s.filtered.length > 0)
  );

  const TABS: { id: MainTab; label: string; emoji: string }[] = [
    { id: 'bookmarks', label: 'Bookmarks', emoji: '🔖' },
    { id: 'downloads', label: 'Downloads', emoji: '📦' },
    { id: 'tools', label: 'Tools', emoji: '🔧' },
    { id: 'apps', label: 'Apps', emoji: '📱' },
  ];

  return (
    <main class="flex flex-col items-center overflow-y-auto px-8 py-12">
      <p class="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
        {props.today}
      </p>
      <h1 class="mb-6 text-3xl font-black tracking-tight">Start Page</h1>

      <div class="mb-6 w-full max-w-3xl">
        <SearchBar query={props.query} onChange={props.onQueryChange} />
      </div>

      {/* Tab bar */}
      <div class="mb-8 w-full max-w-3xl">
        <div class="tabs tabs-boxed w-full justify-center">
          {TABS.map(({ id, label, emoji }) => (
            <button
              key={id}
              class={`tab flex-1 gap-1.5 ${tab() === id ? 'tab-active' : ''}`}
              onClick={() => setTab(id)}>
              <span>{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools tab */}
      {tab() === 'tools' && (
        <>
          {filteredTools().map(({ label, filtered }) =>
            !filtering() || filtered.length > 0 ? (
              <Section label={label} count={filtered.length}>
                <div class={GRID}>
                  {filtered.map((t) => (
                    <ToolCard key={t.label} {...t} />
                  ))}
                </div>
              </Section>
            ) : null
          )}
          {filtering() &&
            !filteredTools().some((s) => s.filtered.length > 0) && (
              <p class="text-base-content/30 mt-20 text-sm">
                No tools match &quot;{props.query}&quot;.
              </p>
            )}
        </>
      )}

      {/* Bookmarks tab */}
      {tab() === 'bookmarks' && (
        <>
          {filteredBookmarks().map(({ label, filtered }) =>
            !filtering() || filtered.length > 0 ? (
              <Section label={label} count={filtered.length}>
                <div class={GRID}>
                  {filtered.map((bm) => (
                    <BookmarkCard key={bm.label} {...bm} />
                  ))}
                </div>
              </Section>
            ) : null
          )}
          {filtering() &&
            !filteredBookmarks().some((s) => s.filtered.length > 0) && (
              <p class="text-base-content/30 mt-20 text-sm">
                No bookmarks match &quot;{props.query}&quot;.
              </p>
            )}
        </>
      )}

      {/* Downloads tab */}
      {tab() === 'downloads' && (
        <>
          {filteredDownloads().map(({ label, filtered }) =>
            !filtering() || filtered.length > 0 ? (
              <Section label={label} count={filtered.length}>
                <div class={GRID}>
                  {filtered.map((a) => (
                    <DownloadCard key={a.id} {...a} />
                  ))}
                </div>
              </Section>
            ) : null
          )}
          {filtering() &&
            !filteredDownloads().some((s) => s.filtered.length > 0) && (
              <p class="text-base-content/30 mt-20 text-sm">
                No downloads match &quot;{props.query}&quot;.
              </p>
            )}
        </>
      )}

      {/* Apps tab */}
      {tab() === 'apps' && (
        <>
          {filteredApps().map(({ label, filtered }) =>
            !filtering() || filtered.length > 0 ? (
              <Section label={label} count={filtered.length}>
                <div class={GRID}>
                  {filtered.map((a) => (
                    <AppCard key={a.id} {...a} />
                  ))}
                </div>
              </Section>
            ) : null
          )}
          {filtering() &&
            !filteredApps().some((s) => s.filtered.length > 0) && (
              <p class="text-base-content/30 mt-20 text-sm">
                No apps match &quot;{props.query}&quot;.
              </p>
            )}
        </>
      )}

      {filtering() && !hasAnyResult() && (
        <p class="text-base-content/30 mt-20 text-sm">
          No results for &quot;{props.query}&quot; \u2014 press 🔍 to search
          Google.
        </p>
      )}
    </main>
  );
};

/* ------------------------------------------------------------------ */
/* ModalRenderer                                                        */
/* ------------------------------------------------------------------ */

const ModalRenderer = (props: { onClose: () => void }) => {
  const [activeModal] = createSignal<ModalId | null>(null);
  // activeModal is managed by AppPage, but we read from parent's activeModal
  // This component is just for rendering the active modal
  return null;
};

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

const AppPage = () => {
  const [times, setTimes] = createSignal(
    timezones.map(({ tz }) => getTimeInZone(tz))
  );
  const [today, setToday] = createSignal('');
  const [activeModal, setActiveModal] = createSignal<ModalId | null>(null);
  const [activeSidebar, setActiveSidebar] = createSignal<SidebarTab | null>(
    null
  );
  const [query, setQuery] = createSignal('');

  const close = () => setActiveModal(null);

  const open = (id: ModalId) => () => setActiveModal(id);

  const toolSections = createMemo(() => makeTools(open));

  onMount(() => {
    setToday(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
    const interval = setInterval(
      () => setTimes(timezones.map(({ tz }) => getTimeInZone(tz))),
      1000
    );
    onCleanup(() => clearInterval(interval));
  });

  const toggleSidebar = (tab: SidebarTab) =>
    setActiveSidebar((prev) => (prev === tab ? null : tab));

  const allSections = createMemo(() => {
    const filtering = query().trim().length > 0;
    const f = <T extends { label?: string; id?: string }>(
      items: T[],
      key: keyof T & ('label' | 'id')
    ) =>
      filtering
        ? items.filter((item) => match(String(item[key] ?? ''), query()))
        : items;

    return [
      {
        label: 'Chatbot',
        items: f(chatBookmarks, 'label'),
        Card: BookmarkCard,
      },
      {
        label: 'Code',
        items: f(codeBookmarks, 'label'),
        Card: BookmarkCard,
      },
      {
        label: 'Google Workspace',
        items: f(googleBookmarks, 'label'),
        Card: BookmarkCard,
      },
      {
        label: 'Messaging',
        items: f(messagingBookmarks, 'label'),
        Card: BookmarkCard,
      },
      {
        label: 'Music',
        items: f(musicBookmarks, 'label'),
        Card: BookmarkCard,
      },
      {
        label: 'Social',
        items: f(socialBookmarks, 'label'),
        Card: BookmarkCard,
      },
      {
        label: 'Work',
        items: f(workBookmarks, 'label'),
        Card: BookmarkCard,
      },
      {
        label: 'Tools',
        items: f(toolSections().tools, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Calculators',
        items: f(toolSections().calculators, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Clocks',
        items: f(toolSections().clocks, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Converters',
        items: f(toolSections().converters, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Editors',
        items: f(toolSections().editors, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Education',
        items: f(toolSections().education, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Eyes',
        items: f(toolSections().eyes, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Games',
        items: f(toolSections().games, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Images',
        items: f(toolSections().images, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Visualization',
        items: f(toolSections().visualization, 'label'),
        Card: BookmarkCard,
      },
      {
        label: 'Agents',
        items: f(agents, 'label'),
        Card: DownloadCard,
      },
      { label: 'CLIs', items: f(clis, 'id'), Card: DownloadCard },
      { label: 'Extensions', items: f(extensions, 'id'), Card: DownloadCard },
      {
        label: 'IDEs',
        items: f(ides, 'label'),
        Card: DownloadCard,
      },
      { label: 'Packages', items: f(packages, 'id'), Card: DownloadCard },
      { label: 'Apps', items: f(apps, 'id'), Card: AppCard },
    ];
  });

  return (
    <div class="bg-base-100 text-base-content min-h-screen">
      {/* Desktop */}
      <div
        class="hidden h-screen overflow-hidden lg:grid"
        style={{ gridTemplateColumns: '280px 2fr 320px' } as any}>
        <LeftSidebar />
        <MainContent
          today={today()}
          query={query()}
          onQueryChange={setQuery}
          toolSections={toolSections()}
        />
        <RightSidebar times={times()} />
      </div>

      {/* Mobile */}
      <div class="flex min-h-screen flex-col lg:hidden">
        <main class="flex-1 overflow-y-auto px-4 py-8">
          <p class="text-base-content/30 mb-2 text-center font-mono text-xs tracking-widest uppercase">
            {today()}
          </p>
          <h1 class="mb-6 text-center text-2xl font-black tracking-tight">
            Start Page
          </h1>

          <div class="mx-auto mb-6 w-full max-w-2xl">
            <SearchBar query={query()} onChange={setQuery} />
          </div>

          {allSections()
            .filter(({ items }) => items.length > 0)
            .map(({ label, items, Card }) => (
              <section aria-label={label} class="mx-auto mt-8 w-full max-w-2xl">
                <p class="text-base-content/30 mb-4 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
                  {label}
                  <span class="badge badge-xs badge-neutral font-mono tracking-normal normal-case">
                    {items.length}
                  </span>
                </p>
                <div class={GRID_MOBILE}>
                  {items.map((item: any) => (
                    <Card key={item.label ?? item.id} {...item} />
                  ))}
                </div>
              </section>
            ))}

          {query().trim().length > 0 &&
            allSections().every(({ items }) => items.length === 0) && (
              <p class="text-base-content/30 mt-20 text-center text-sm">
                No results for &quot;{query()}&quot; \u2014 press 🔍 to search
                Google.
              </p>
            )}

          <div class="h-20" />
        </main>

        {/* Bottom nav */}
        <nav class="bg-base-100 border-base-300 fixed inset-x-0 bottom-0 z-40 flex border-t">
          {(['tasks', 'clock'] as const).map((tab) => (
            <button
              key={tab}
              class={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${
                activeSidebar() === tab
                  ? 'text-primary'
                  : 'text-base-content/40 hover:text-base-content/70'
              }`}
              onClick={() => toggleSidebar(tab)}>
              <span class="text-lg">{tab === 'tasks' ? '📡' : '🕐'}</span>
              {tab === 'tasks' ? 'Tasks' : 'Clock'}
            </button>
          ))}
        </nav>

        {/* Sidebar drawer */}
        {activeSidebar() && (
          <>
            <div
              class="fixed inset-0 z-40 bg-black/40"
              onClick={() => setActiveSidebar(null)}
            />
            <div class="bg-base-100 border-base-300 fixed inset-x-0 bottom-16 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t">
              <div class="bg-base-100 border-base-300 sticky top-0 flex items-center justify-between border-b px-4 py-3">
                <span class="text-sm font-semibold capitalize">
                  {activeSidebar() === 'tasks' ? 'Tasks' : 'Clock'}
                </span>
                <button
                  class="btn btn-ghost btn-xs btn-circle"
                  onClick={() => setActiveSidebar(null)}>
                  ✕
                </button>
              </div>
              <div class="p-4">
                {activeSidebar() === 'tasks' ? (
                  <LeftSidebar />
                ) : (
                  <RightSidebar times={times()} />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {(() => {
        const id = activeModal();
        if (!id) return null;
        const ModalComponent = MODAL_MAP[id];
        return (
          <Suspense fallback={null}>
            <ModalComponent onClose={close} />
          </Suspense>
        );
      })()}
    </div>
  );
};

export default AppPage;
