import { AppCard } from '@hieudoanm/components/cards/AppCard';
import { BookmarkCard } from '@hieudoanm/components/cards/BookmarkCard';
import { DownloadCard } from '@hieudoanm/components/cards/DownloadCard';
import { Tool, ToolCard } from '@hieudoanm/components/cards/ToolCard';
import { CalculatorModal } from '@hieudoanm/components/modals/calculators/CalculatorModal';
import { ConverterModal } from '@hieudoanm/components/modals/calculators/ConverterModal';
import { EloModal } from '@hieudoanm/components/modals/calculators/EloModal';
import { InflationModal } from '@hieudoanm/components/modals/calculators/InflationModal';
import { PokerModal } from '@hieudoanm/components/modals/calculators/PokerModal';
import { TaxModal } from '@hieudoanm/components/modals/calculators/TaxModal';
import { ChessClockModal } from '@hieudoanm/components/modals/clocks/ChessClockModal';
import { CountdownModal } from '@hieudoanm/components/modals/clocks/CountdownModal';
import { PomodoroModal } from '@hieudoanm/components/modals/clocks/PomodoroModal';
import { WatchFaceModal } from '@hieudoanm/components/modals/clocks/WatchfaceModal';
import { BrailleModal } from '@hieudoanm/components/modals/converters/BrailleModal';
import { ColorsModal } from '@hieudoanm/components/modals/converters/ColorsModal';
import { MorseModal } from '@hieudoanm/components/modals/converters/MorseModal';
import { OpenAPI2Postman } from '@hieudoanm/components/modals/converters/OpenAPI2Postman';
import { JSONSchemaModal } from '@hieudoanm/components/modals/editors/JSONSchemaModal';
import { ManifestModal } from '@hieudoanm/components/modals/editors/ManifestModal';
import { MarkdownModal } from '@hieudoanm/components/modals/editors/MarkdownModal';
import { EnglishModal } from '@hieudoanm/components/modals/education/EnglishModal';
import { FlashcardsModal } from '@hieudoanm/components/modals/education/FlashcardsModal';
import { PeriodicTableModal } from '@hieudoanm/components/modals/education/PeriodicTableModal';
import { PitchModal } from '@hieudoanm/components/modals/education/PitchModal';
import { LogMARChartModal } from '@hieudoanm/components/modals/eyes/LogMARChartModal';
import { SnellenChartModal } from '@hieudoanm/components/modals/eyes/SnellenChartModal';
import { TumblingEChartModal } from '@hieudoanm/components/modals/eyes/TumblingEChartModal';
import { BlackjackModal } from '@hieudoanm/components/modals/games/BlackjackModal';
import { PalindromeModal } from '@hieudoanm/components/modals/games/PalindromeModal';
import { PiModal } from '@hieudoanm/components/modals/games/PiNumberModal';
import { PokedexModal } from '@hieudoanm/components/modals/games/PokedexModal';
import { QuizifyModal } from '@hieudoanm/components/modals/games/QuizifyModal';
import { RecallModal } from '@hieudoanm/components/modals/games/RecallModal';
import { T3Modal } from '@hieudoanm/components/modals/games/T3Modal';
import { TowersModal } from '@hieudoanm/components/modals/games/TowersModal';
import { TypoglycemiaModal } from '@hieudoanm/components/modals/games/TypoglycemiaModal';
import { WordleModal } from '@hieudoanm/components/modals/games/WordleModal';
import { BreakingBadModal } from '@hieudoanm/components/modals/images/BreakingBadModal';
import { GitHubSocialPreviewModal } from '@hieudoanm/components/modals/images/GitHubSocialPreviewModal';
import { HouseModal } from '@hieudoanm/components/modals/images/HouseModal';
import { QRCodeModal } from '@hieudoanm/components/modals/images/QRCodeModal';
import { YouTubeThumbnailsModal } from '@hieudoanm/components/modals/images/YouTubeThumbnailsModal';
import { ClipboardModal } from '@hieudoanm/components/modals/tools/ClipboardModal';
import { DOIModal } from '@hieudoanm/components/modals/tools/DOIModal';
import { EmojisModal } from '@hieudoanm/components/modals/tools/EmojisModal';
import { FigletModal } from '@hieudoanm/components/modals/tools/FigletModal';
import { IPModal } from '@hieudoanm/components/modals/tools/IPModal';
import { KaprekarModal } from '@hieudoanm/components/modals/tools/KaprekarModal';
import { NoSleepModal } from '@hieudoanm/components/modals/tools/NoSleepModal';
import { ProxyModal } from '@hieudoanm/components/modals/tools/ProxyModal';
import { ShopifyDetectModal } from '@hieudoanm/components/modals/tools/ShopifyDetectModal';
import { StringModal } from '@hieudoanm/components/modals/tools/StringModal';
import { SVGModal } from '@hieudoanm/components/modals/tools/SVGModal';
import { UUIDModal } from '@hieudoanm/components/modals/tools/UUIDModal';
import { CalendarTrackerModal } from '@hieudoanm/components/modals/visualization/CalendarTracker';
import { LegislationModal } from '@hieudoanm/components/modals/visualization/LegislationModal';
import { LeftSidebar } from '@hieudoanm/components/sidebars/LeftSidebar';
import { RightSidebar } from '@hieudoanm/components/sidebars/RightSidebar';
import { apps } from '@hieudoanm/data/apps';
import {
  chat as chatBookmarks,
  code as codeBookmarks,
  google as googleBookmarks,
  messaging as messagingBookmarks,
  music as musicBookmarks,
  social as socialBookmarks,
  work as workBookmarks,
} from '@hieudoanm/data/bookmarks';
import {
  agents,
  clis,
  ides,
  extensions,
  packages,
} from '@hieudoanm/data/downloads';
import { getTimeInZone, timezones } from '@hieudoanm/data/timezones';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import {
  ComponentType,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/* ------------------------------------------------------------------ */
/* Dynamic Modals (SSR: false)                                        */
/* ------------------------------------------------------------------ */

const RedactModal = dynamic(
  () =>
    import('@hieudoanm/components/modals/editors/RedactModal').then(
      (mod) => mod.RedactModal
    ),
  { ssr: false }
);

const InstaSizeModal = dynamic(
  () =>
    import('@hieudoanm/components/modals/images/InstaSizeModal').then(
      (mod) => mod.InstaSizeModal
    ),
  { ssr: false }
);

const InvoiceParserModal = dynamic(
  () =>
    import('@hieudoanm/components/modals/images/InvoiceParserModal').then(
      (mod) => mod.InvoiceParserModal
    ),
  { ssr: false }
);

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type ModalId =
  | 'braille'
  | 'breaking-bad'
  | 'calculator'
  | 'colors'
  | 'converter'
  | 'countdown'
  | 'doi'
  | 'emojis'
  | 'house'
  | 'ip'
  | 'kaprekar'
  | 'morse'
  | 'no-sleep'
  | 'pitch'
  | 'pomodoro'
  | 'qr'
  | 'string'
  | 'uuid'
  | 'flashcards'
  | 'periodic-table'
  | 'blackjack'
  | 'pi'
  | 'poker'
  | 'recall'
  | 't3'
  | 'towers'
  | 'typoglycemia'
  | 'wordle'
  | 'tax'
  | 'elo'
  | 'inflation'
  | 'openapi'
  | 'english'
  | 'manifest'
  | 'redact'
  | 'github-social-preview'
  | 'json-schema'
  | 'shopify-detect'
  | 'pokedex'
  | 'figlet'
  | 'markdown'
  | 'youtube-thumbnails'
  | 'instasize'
  | 'palindrome'
  | 'clipboard'
  | 'calendar-tracker'
  | 'legislation'
  | 'chess-clock'
  | 'watchface'
  | 'invoice-parser'
  | 'logmar'
  | 'snellen'
  | 'svg'
  | 'tumbling-e'
  | 'quizify'
  | 'proxy';

type SidebarTab = 'tasks' | 'clock';

/* ------------------------------------------------------------------ */
/* Modal registry — module-level constant, never recreated             */
/* ------------------------------------------------------------------ */

const MODAL_MAP: Record<
  ModalId,
  FC<{ onClose: () => void }> | ComponentType<{ onClose: () => void }>
> = {
  braille: BrailleModal,
  'breaking-bad': BreakingBadModal,
  calculator: CalculatorModal,
  colors: ColorsModal,
  converter: ConverterModal,
  countdown: CountdownModal,
  doi: DOIModal,
  emojis: EmojisModal,
  house: HouseModal,
  inflation: InflationModal,
  ip: IPModal,
  kaprekar: KaprekarModal,
  manifest: ManifestModal,
  morse: MorseModal,
  'no-sleep': NoSleepModal,
  pitch: PitchModal,
  pomodoro: PomodoroModal,
  qr: QRCodeModal,
  string: StringModal,
  uuid: UUIDModal,
  flashcards: FlashcardsModal,
  'periodic-table': PeriodicTableModal,
  blackjack: BlackjackModal,
  pi: PiModal,
  poker: PokerModal,
  recall: RecallModal,
  t3: T3Modal,
  towers: TowersModal,
  typoglycemia: TypoglycemiaModal,
  wordle: WordleModal,
  tax: TaxModal,
  elo: EloModal,
  openapi: OpenAPI2Postman,
  english: EnglishModal,
  'github-social-preview': GitHubSocialPreviewModal,
  redact: RedactModal,
  'json-schema': JSONSchemaModal,
  'shopify-detect': ShopifyDetectModal,
  pokedex: PokedexModal,
  figlet: FigletModal,
  markdown: MarkdownModal,
  'youtube-thumbnails': YouTubeThumbnailsModal,
  instasize: InstaSizeModal,
  palindrome: PalindromeModal,
  'calendar-tracker': CalendarTrackerModal,
  clipboard: ClipboardModal,
  legislation: LegislationModal,
  'chess-clock': ChessClockModal,
  watchface: WatchFaceModal,
  'invoice-parser': InvoiceParserModal,
  logmar: LogMARChartModal,
  snellen: SnellenChartModal,
  svg: SVGModal,
  'tumbling-e': TumblingEChartModal,
  quizify: QuizifyModal,
  proxy: ProxyModal,
};

/* ------------------------------------------------------------------ */
/* Tool definitions — module-level, keyed by section                   */
/* Each entry is a factory that receives the open callback once.       */
/* ------------------------------------------------------------------ */

const makeTools = (
  open: (id: ModalId) => () => void
): Record<string, Tool[]> => ({
  tools: [
    {
      label: 'Clipboard',
      description: 'Clipboard',
      emoji: '📋',
      color: '#3b82f6',
      onClick: open('clipboard'),
    },
    {
      label: 'DOI',
      description: 'Cite',
      emoji: '📄',
      color: '#3b82f6',
      onClick: open('doi'),
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
      label: 'Redact',
      description: 'PDF Redactor',
      emoji: '🖋️',
      color: '#3b82f6',
      onClick: open('redact'),
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
/* Filter helper — module-level                                        */
/* ------------------------------------------------------------------ */

const match = (label: string, q: string) =>
  label.toLowerCase().includes(q.toLowerCase());

/* ------------------------------------------------------------------ */
/* SearchBar                                                            */
/* ------------------------------------------------------------------ */

const SearchBar: FC<{ query: string; onChange: (v: string) => void }> = memo(
  ({ query, onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const googleSearch = useCallback(() => {
      if (!query.trim()) return;
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`,
        '_blank'
      );
    }, [query]);

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') googleSearch();
      },
      [googleSearch]
    );

    return (
      <div className="join w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search or filter…"
          className="input input-bordered join-item w-full"
        />
        <button
          className="btn join-item btn-neutral"
          onClick={googleSearch}
          aria-label="Search with Google">
          🔍
        </button>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

const Section: FC<{
  label: string;
  count?: number;
  children: React.ReactNode;
}> = memo(({ label, count, children }) => (
  <section aria-label={label} className="mt-10 w-full max-w-2xl">
    <p className="text-base-content/30 mb-4 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
      {label}
      {count !== undefined && (
        <span className="badge badge-xs badge-neutral font-mono tracking-normal normal-case">
          {count}
        </span>
      )}
    </p>
    {children}
  </section>
));
Section.displayName = 'Section';

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

type MainContentProps = {
  today: string;
  query: string;
  onQueryChange: (v: string) => void;
  toolSections: ReturnType<typeof makeTools>;
};

const MainContent: FC<MainContentProps> = memo(
  ({ today, query, onQueryChange, toolSections }) => {
    const [tab, setTab] = useState<MainTab>('bookmarks');
    const filtering = query.trim().length > 0;

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
    } = toolSections;

    // Bookmark sections
    const bookmarkSections = useMemo(
      () => [
        { label: 'Chatbot', items: chatBookmarks },
        { label: 'Code', items: codeBookmarks },
        { label: 'Google Workspace', items: googleBookmarks },
        { label: 'Messaging', items: messagingBookmarks },
        { label: 'Music', items: musicBookmarks },
        { label: 'Social', items: socialBookmarks },
        { label: 'Work', items: workBookmarks },
      ],
      []
    );

    // Tool sections
    const toolSectionDefs = useMemo(
      () => [
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
      ],
      [
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
      ]
    );

    // Download sections
    const downloadSections = useMemo(
      () => [
        { label: 'Agents', items: agents },
        { label: 'CLIs', items: clis },
        { label: 'Extensions', items: extensions },
        { label: 'IDEs', items: ides },
        { label: 'Packages', items: packages },
      ],
      []
    );

    const appSections = useMemo(() => [{ label: 'Apps', items: apps }], []);

    // Filtered helpers
    const filteredBookmarks = useMemo(
      () =>
        bookmarkSections.map((s) => ({
          ...s,
          filtered: filtering
            ? s.items.filter((b) => match(b.label, query))
            : s.items,
        })),
      [bookmarkSections, filtering, query]
    );

    const filteredTools = useMemo(
      () =>
        toolSectionDefs.map((s) => ({
          ...s,
          filtered: filtering
            ? s.items.filter((t) => match(t.label, query))
            : s.items,
        })),
      [toolSectionDefs, filtering, query]
    );

    const filteredDownloads = useMemo(
      () =>
        downloadSections.map((s) => ({
          ...s,
          filtered: filtering
            ? s.items.filter((a) => match(a.id, query))
            : s.items,
        })),
      [downloadSections, filtering, query]
    );

    const filteredApps = useMemo(
      () =>
        appSections.map((s) => ({
          ...s,
          filtered: filtering
            ? s.items.filter((a) => match(a.id, query))
            : s.items,
        })),
      [appSections, filtering, query]
    );

    // Auto-switch tab when filtering produces results in another tab
    useEffect(() => {
      if (!filtering) return;
      const hasTools = filteredTools.some((s) => s.filtered.length > 0);
      const hasBookmarks = filteredBookmarks.some((s) => s.filtered.length > 0);
      const hasDownloads = filteredDownloads.some((s) => s.filtered.length > 0);
      const hasApps = filteredApps.some((s) => s.filtered.length > 0);
      if (tab === 'tools' && !hasTools && hasBookmarks) setTab('bookmarks');
      else if (tab === 'bookmarks' && !hasBookmarks && hasTools)
        setTab('tools');
      else if (tab === 'downloads' && !hasDownloads && hasTools)
        setTab('tools');
      else if (tab === 'apps' && !hasApps && hasTools) setTab('tools');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const hasAnyResult =
      filteredBookmarks.some((s) => s.filtered.length > 0) ||
      filteredTools.some((s) => s.filtered.length > 0) ||
      filteredDownloads.some((s) => s.filtered.length > 0) ||
      filteredApps.some((s) => s.filtered.length > 0);

    const TABS: { id: MainTab; label: string; emoji: string }[] = [
      { id: 'bookmarks', label: 'Bookmarks', emoji: '🔖' },
      { id: 'downloads', label: 'Downloads', emoji: '📦' },
      { id: 'tools', label: 'Tools', emoji: '🔧' },
      { id: 'apps', label: 'Apps', emoji: '📱' },
    ];

    return (
      <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
        <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
          {today}
        </p>
        <h1 className="mb-6 text-3xl font-black tracking-tight">Start Page</h1>

        <div className="mb-6 w-full max-w-3xl">
          <SearchBar query={query} onChange={onQueryChange} />
        </div>

        {/* Tab bar */}
        <div className="mb-8 w-full max-w-3xl">
          <div className="tabs tabs-boxed w-full justify-center">
            {TABS.map(({ id, label, emoji }) => (
              <button
                key={id}
                className={`tab flex-1 gap-1.5 ${tab === id ? 'tab-active' : ''}`}
                onClick={() => setTab(id)}>
                <span>{emoji}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Tools tab ── */}
        {tab === 'tools' && (
          <>
            {filteredTools.map(({ label, filtered }) =>
              !filtering || filtered.length > 0 ? (
                <Section key={label} label={label} count={filtered.length}>
                  <div className={GRID}>
                    {filtered.map((t) => (
                      <ToolCard key={t.label} {...t} />
                    ))}
                  </div>
                </Section>
              ) : null
            )}
            {filtering && !filteredTools.some((s) => s.filtered.length > 0) && (
              <p className="text-base-content/30 mt-20 text-sm">
                No tools match "{query}".
              </p>
            )}
          </>
        )}

        {/* ── Bookmarks tab ── */}
        {tab === 'bookmarks' && (
          <>
            {filteredBookmarks.map(({ label, filtered }) =>
              !filtering || filtered.length > 0 ? (
                <Section key={label} label={label} count={filtered.length}>
                  <div className={GRID}>
                    {filtered.map((bm) => (
                      <BookmarkCard key={bm.label} {...bm} />
                    ))}
                  </div>
                </Section>
              ) : null
            )}
            {filtering &&
              !filteredBookmarks.some((s) => s.filtered.length > 0) && (
                <p className="text-base-content/30 mt-20 text-sm">
                  No bookmarks match "{query}".
                </p>
              )}
          </>
        )}

        {/* ── Downloads tab ── */}
        {tab === 'downloads' && (
          <>
            {filteredDownloads.map(({ label, filtered }) =>
              !filtering || filtered.length > 0 ? (
                <Section key={label} label={label} count={filtered.length}>
                  <div className={GRID}>
                    {filtered.map((a) => (
                      <DownloadCard key={a.id} {...a} />
                    ))}
                  </div>
                </Section>
              ) : null
            )}
            {filtering &&
              !filteredDownloads.some((s) => s.filtered.length > 0) && (
                <p className="text-base-content/30 mt-20 text-sm">
                  No downloads match "{query}".
                </p>
              )}
          </>
        )}

        {/* ── Apps tab ── */}
        {tab === 'apps' && (
          <>
            {filteredApps.map(({ label, filtered }) =>
              !filtering || filtered.length > 0 ? (
                <Section key={label} label={label} count={filtered.length}>
                  <div className={GRID}>
                    {filtered.map((a) => (
                      <AppCard key={a.id} {...a} />
                    ))}
                  </div>
                </Section>
              ) : null
            )}
            {filtering && !filteredApps.some((s) => s.filtered.length > 0) && (
              <p className="text-base-content/30 mt-20 text-sm">
                No apps match "{query}".
              </p>
            )}
          </>
        )}

        {filtering && !hasAnyResult && (
          <p className="text-base-content/30 mt-20 text-sm">
            No results for "{query}" — press 🔍 to search Google.
          </p>
        )}
      </main>
    );
  }
);

MainContent.displayName = 'MainContent';

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

const AppPage: NextPage = () => {
  const [times, setTimes] = useState(() =>
    timezones.map(({ tz }) => getTimeInZone(tz))
  );
  const [today, setToday] = useState('');
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);
  const [activeSidebar, setActiveSidebar] = useState<SidebarTab | null>(null);
  const [query, setQuery] = useState('');

  const close = useCallback(() => setActiveModal(null), []);

  // Stable open factory — memoized once
  const open = useCallback((id: ModalId) => () => setActiveModal(id), []);

  // Tool sections derived once from the stable open callback
  const toolSections = useMemo(() => makeTools(open), [open]);

  useEffect(() => {
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
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = useCallback(
    (tab: SidebarTab) =>
      setActiveSidebar((prev) => (prev === tab ? null : tab)),
    []
  );

  // Mobile filtered sections — single source of truth
  const allSections = useMemo(() => {
    const filtering = query.trim().length > 0;
    const f = <T extends { label?: string; id?: string }>(
      items: T[],
      key: keyof T & ('label' | 'id')
    ) =>
      filtering
        ? items.filter((item) => match(String(item[key] ?? ''), query))
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
      { label: 'Tools', items: f(toolSections.tools, 'label'), Card: ToolCard },
      {
        label: 'Calculators',
        items: f(toolSections.calculators, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Clocks',
        items: f(toolSections.clocks, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Converters',
        items: f(toolSections.converters, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Editors',
        items: f(toolSections.editors, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Education',
        items: f(toolSections.education, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Eyes',
        items: f(toolSections.eyes, 'label'),
        Card: ToolCard,
      },
      { label: 'Games', items: f(toolSections.games, 'label'), Card: ToolCard },
      {
        label: 'Images',
        items: f(toolSections.images, 'label'),
        Card: ToolCard,
      },
      {
        label: 'Visualization',
        items: f(toolSections.visualization, 'label'),
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
  }, [query, toolSections]);

  const ActiveModal = activeModal ? MODAL_MAP[activeModal] : null;

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Desktop */}
      <div
        className="hidden h-screen overflow-hidden lg:grid"
        style={{ gridTemplateColumns: '280px 2fr 320px' }}>
        <LeftSidebar />
        <MainContent
          today={today}
          query={query}
          onQueryChange={setQuery}
          toolSections={toolSections}
        />
        <RightSidebar times={times} />
      </div>

      {/* Mobile */}
      <div className="flex min-h-screen flex-col lg:hidden">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <p className="text-base-content/30 mb-2 text-center font-mono text-xs tracking-widest uppercase">
            {today}
          </p>
          <h1 className="mb-6 text-center text-2xl font-black tracking-tight">
            Start Page
          </h1>

          <div className="mx-auto mb-6 w-full max-w-2xl">
            <SearchBar query={query} onChange={setQuery} />
          </div>

          {allSections
            .filter(({ items }) => items.length > 0)
            .map(({ label, items, Card }) => (
              <section
                key={label}
                aria-label={label}
                className="mx-auto mt-8 w-full max-w-2xl">
                <p className="text-base-content/30 mb-4 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
                  {label}
                  <span className="badge badge-xs badge-neutral font-mono tracking-normal normal-case">
                    {items.length}
                  </span>
                </p>
                <div className={GRID_MOBILE}>
                  {items.map((item: any) => (
                    <Card key={item.label ?? item.id} {...item} />
                  ))}
                </div>
              </section>
            ))}

          {query.trim().length > 0 &&
            allSections.every(({ items }) => items.length === 0) && (
              <p className="text-base-content/30 mt-20 text-center text-sm">
                No results for "{query}" — press 🔍 to search Google.
              </p>
            )}

          <div className="h-20" />
        </main>

        {/* Bottom nav */}
        <nav className="bg-base-100 border-base-300 fixed inset-x-0 bottom-0 z-40 flex border-t">
          {(['tasks', 'clock'] as const).map((tab) => (
            <button
              key={tab}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${
                activeSidebar === tab
                  ? 'text-primary'
                  : 'text-base-content/40 hover:text-base-content/70'
              }`}
              onClick={() => toggleSidebar(tab)}>
              <span className="text-lg">{tab === 'tasks' ? '📡' : '🕐'}</span>
              {tab === 'tasks' ? 'Tasks' : 'Clock'}
            </button>
          ))}
        </nav>

        {/* Sidebar drawer */}
        {activeSidebar && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setActiveSidebar(null)}
            />
            <div className="bg-base-100 border-base-300 fixed inset-x-0 bottom-16 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t">
              <div className="bg-base-100 border-base-300 sticky top-0 flex items-center justify-between border-b px-4 py-3">
                <span className="text-sm font-semibold capitalize">
                  {activeSidebar === 'tasks' ? 'Tasks' : 'Clock'}
                </span>
                <button
                  className="btn btn-ghost btn-xs btn-circle"
                  onClick={() => setActiveSidebar(null)}>
                  ✕
                </button>
              </div>
              <div className="p-4">
                {activeSidebar === 'tasks' ? (
                  <LeftSidebar />
                ) : (
                  <RightSidebar times={times} />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {ActiveModal && <ActiveModal onClose={close} />}
    </div>
  );
};

export default AppPage;
