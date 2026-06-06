import { BookmarkCard } from '@hieudoanm.github.io/components/pages/start/cards/BookmarkCard';
import { DownloadCard } from '@hieudoanm.github.io/components/pages/start/cards/DownloadCard';
import {
  Tool,
  ToolCard,
} from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { LeftSidebar } from '@hieudoanm.github.io/components/pages/start/sidebars/LeftSidebar';
import { RightSidebar } from '@hieudoanm.github.io/components/pages/start/sidebars/RightSidebar';
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
    import('@hieudoanm.github.io/components/pages/start/modals/editors/RedactModal').then(
      (mod) => mod.RedactModal
    ),
  { ssr: false }
);
const RegexModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/RegexModal').then(
      (mod) => mod.RegexModal
    ),
  { ssr: false }
);
const InstaSizeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InstaSizeModal').then(
      (mod) => mod.InstaSizeModal
    ),
  { ssr: false }
);
const InvoiceParserModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InvoiceParserModal').then(
      (mod) => mod.InvoiceParserModal
    ),
  { ssr: false }
);

const CameraModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/CameraModal').then(
      (mod) => mod.CameraModal
    ),
  { ssr: false }
);

const SignModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/SignModal').then(
      (mod) => mod.SignModal
    ),
  { ssr: false }
);

const Game2048Modal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/Game2048Modal').then(
      (mod) => mod.Game2048Modal
    ),
  { ssr: false }
);

const BlackjackModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/BlackjackModal').then(
      (mod) => mod.BlackjackModal
    ),
  { ssr: false }
);

const BrailleModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/BrailleModal').then(
      (mod) => mod.BrailleModal
    ),
  { ssr: false }
);

const LeetSpeakModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/LeetSpeakModal').then(
      (mod) => mod.LeetSpeakModal
    ),
  { ssr: false }
);

const BreakingBadModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BreakingBadModal').then(
      (mod) => mod.BreakingBadModal
    ),
  { ssr: false }
);

const CalculatorModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/CalculatorModal').then(
      (mod) => mod.CalculatorModal
    ),
  { ssr: false }
);

const CalendarTrackerModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker').then(
      (mod) => mod.CalendarTrackerModal
    ),
  { ssr: false }
);

const ChatModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ChatModal/ChatModal').then(
      (mod) => mod.ChatModal
    ),
  { ssr: false }
);

const ChessClockModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/ChessClockModal').then(
      (mod) => mod.ChessClockModal
    ),
  { ssr: false }
);

const ClipboardModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ClipboardModal').then(
      (mod) => mod.ClipboardModal
    ),
  { ssr: false }
);

const ColorsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/ColorsModal').then(
      (mod) => mod.ColorsModal
    ),
  { ssr: false }
);

const ConverterModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/ConverterModal').then(
      (mod) => mod.ConverterModal
    ),
  { ssr: false }
);

const CountdownModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CountdownModal').then(
      (mod) => mod.CountdownModal
    ),
  { ssr: false }
);

const CronModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CronModal').then(
      (mod) => mod.CronModal
    ),
  { ssr: false }
);

const DOIModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/academic/DOIModal').then(
      (mod) => mod.DOIModal
    ),
  { ssr: false }
);

const EloModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/EloModal').then(
      (mod) => mod.EloModal
    ),
  { ssr: false }
);

const EmojisModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/EmojisModal').then(
      (mod) => mod.EmojisModal
    ),
  { ssr: false }
);

const FigletModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/FigletModal').then(
      (mod) => mod.FigletModal
    ),
  { ssr: false }
);

const FlashcardsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/FlashcardsModal').then(
      (mod) => mod.FlashcardsModal
    ),
  { ssr: false }
);

const GitHubSocialPreviewModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/GitHubSocialPreviewModal').then(
      (mod) => mod.GitHubSocialPreviewModal
    ),
  { ssr: false }
);

const HouseModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/HouseModal').then(
      (mod) => mod.HouseModal
    ),
  { ssr: false }
);

const InflationModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/InflationModal').then(
      (mod) => mod.InflationModal
    ),
  { ssr: false }
);

const IPModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/IPModal').then(
      (mod) => mod.IPModal
    ),
  { ssr: false }
);

const JSONSchemaModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/JSONSchemaModal').then(
      (mod) => mod.JSONSchemaModal
    ),
  { ssr: false }
);

const KaprekarModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/KaprekarModal').then(
      (mod) => mod.KaprekarModal
    ),
  { ssr: false }
);

const LegislationModal = dynamic(
  () =>
    import('./modals/visualization/LegislationModal').then(
      (mod) => mod.LegislationModal
    ),
  { ssr: false }
);

const LanguagesEnglishModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/EnglishModal').then(
      (mod) => mod.LanguagesEnglishModal
    ),
  { ssr: false }
);

const LogMARChartModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/LogMARChartModal').then(
      (mod) => mod.LogMARChartModal
    ),
  { ssr: false }
);

const ManifestModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ManifestModal').then(
      (mod) => mod.ManifestModal
    ),
  { ssr: false }
);

const MarkdownModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/MarkdownModal').then(
      (mod) => mod.MarkdownModal
    ),
  { ssr: false }
);

const MorseModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/MorseModal').then(
      (mod) => mod.MorseModal
    ),
  { ssr: false }
);

const NoSleepModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/NoSleepModal').then(
      (mod) => mod.NoSleepModal
    ),
  { ssr: false }
);

const OpenAPI2Postman = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/OpenAPI2Postman').then(
      (mod) => mod.OpenAPI2Postman
    ),
  { ssr: false }
);

const PalindromeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PalindromeModal').then(
      (mod) => mod.PalindromeModal
    ),
  { ssr: false }
);

const PeriodicTableModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/chemistry/PeriodicTableModal').then(
      (mod) => mod.PeriodicTableModal
    ),
  { ssr: false }
);

const PiModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/PiNumberModal').then(
      (mod) => mod.PiModal
    ),
  { ssr: false }
);
const PitchModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/music/PitchModal').then(
      (mod) => mod.PitchModal
    ),
  { ssr: false }
);

const PdModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PrisonerDilemmaModal').then(
      (mod) => mod.PrisonerDilemmaModal
    ),
  { ssr: false }
);

const PokedexModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PokedexModal').then(
      (mod) => mod.PokedexModal
    ),
  { ssr: false }
);

const PokerModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/PokerModal').then(
      (mod) => mod.PokerModal
    ),
  { ssr: false }
);

const PomodoroModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/PomodoroModal').then(
      (mod) => mod.PomodoroModal
    ),
  { ssr: false }
);

const ProxyModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ProxyModal').then(
      (mod) => mod.ProxyModal
    ),
  { ssr: false }
);

const QRCodeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/QRCodeModal').then(
      (mod) => mod.QRCodeModal
    ),
  { ssr: false }
);

const QuizifyModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/QuizifyModal').then(
      (mod) => mod.QuizifyModal
    ),
  { ssr: false }
);

const RecallModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/RecallModal').then(
      (mod) => mod.RecallModal
    ),
  { ssr: false }
);

const RockPaperScissorsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/RockPaperScissorsModal').then(
      (mod) => mod.RockPaperScissorsModal
    ),
  { ssr: false }
);

const ResumeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ResumeModal').then(
      (mod) => mod.ResumeModal
    ),
  { ssr: false }
);

const SheetsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SheetsModal').then(
      (mod) => mod.SheetsModal
    ),
  { ssr: false }
);

const ShopifyDetectModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ShopifyDetectModal').then(
      (mod) => mod.ShopifyDetectModal
    ),
  { ssr: false }
);

const SlidesModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/SlidesModal').then(
      (mod) => mod.SlidesModal
    ),
  { ssr: false }
);

const SnellenChartModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/SnellenChartModal').then(
      (mod) => mod.SnellenChartModal
    ),
  { ssr: false }
);

const StringModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/StringModal').then(
      (mod) => mod.StringModal
    ),
  { ssr: false }
);

const SVGModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SVGModal').then(
      (mod) => mod.SVGModal
    ),
  { ssr: false }
);

const SudokuModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SudokuModal').then(
      (mod) => mod.SudokuModal
    ),
  { ssr: false }
);

const T3Modal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/T3Modal').then(
      (mod) => mod.T3Modal
    ),
  { ssr: false }
);

const TaxModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/TaxModal').then(
      (mod) => mod.TaxModal
    ),
  { ssr: false }
);

const TowersModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TowersModal').then(
      (mod) => mod.TowersModal
    ),
  { ssr: false }
);

const TumblingEChartModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/TumblingEChartModal').then(
      (mod) => mod.TumblingEChartModal
    ),
  { ssr: false }
);

const TypoglycemiaModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TypoglycemiaModal').then(
      (mod) => mod.TypoglycemiaModal
    ),
  { ssr: false }
);

const UUIDModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/UUIDModal').then(
      (mod) => mod.UUIDModal
    ),
  { ssr: false }
);

const WatchFaceModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/WatchfaceModal').then(
      (mod) => mod.WatchFaceModal
    ),
  { ssr: false }
);

const WordleModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/WordleModal').then(
      (mod) => mod.WordleModal
    ),
  { ssr: false }
);

const YouTubeThumbnailsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/YouTubeThumbnailsModal').then(
      (mod) => mod.YouTubeThumbnailsModal
    ),
  { ssr: false }
);

const SnakeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SnakeModal').then(
      (mod) => mod.SnakeModal
    ),
  { ssr: false }
);

const ResumeTimelineModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/ResumeTimelineModal').then(
      (mod) => mod.ResumeTimelineModal
    ),
  { ssr: false }
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
  | 'cron'
  | 'doi'
  | 'elo'
  | 'emojis'
  | 'english'
  | 'figlet'
  | 'flashcards'
  | 'game2048'
  | 'github-social-preview'
  | 'house'
  | 'inflation'
  | 'instasize'
  | 'invoice-parser'
  | 'ip'
  | 'json-schema'
  | 'kaprekar'
  | 'legislation'
  | 'leetspeak'
  | 'logmar'
  | 'manifest'
  | 'markdown'
  | 'morse'
  | 'no-sleep'
  | 'openapi'
  | 'palindrome'
  | 'pd'
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
  | 'rps'
  | 'regex'
  | 'resume'
  | 'sheets'
  | 'shopify-detect'
  | 'snake'
  | 'sign'
  | 'slides'
  | 'snellen'
  | 'sudoku'
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
  | 'youtube-thumbnails'
  | 'resume-timeline';

type SidebarTab = 'tasks' | 'clock';

/* ------------------------------------------------------------------ */
/* Modal registry — module-level constant, never recreated             */
/* ------------------------------------------------------------------ */

const MODAL_MAP: Record<
  ModalId,
  FC<{ onClose: () => void }> | ComponentType<{ onClose: () => void }>
> = {
  game2048: Game2048Modal,
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
  cron: CronModal,
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
  leetspeak: LeetSpeakModal,
  'no-sleep': NoSleepModal,
  openapi: OpenAPI2Postman,
  palindrome: PalindromeModal,
  pd: PdModal,
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
  rps: RockPaperScissorsModal,
  regex: RegexModal,
  resume: ResumeModal,
  sheets: SheetsModal,
  'shopify-detect': ShopifyDetectModal,
  sign: SignModal,
  slides: SlidesModal,
  snellen: SnellenChartModal,
  string: StringModal,
  svg: SVGModal,
  sudoku: SudokuModal,
  t3: T3Modal,
  tax: TaxModal,
  towers: TowersModal,
  'tumbling-e': TumblingEChartModal,
  typoglycemia: TypoglycemiaModal,
  uuid: UUIDModal,
  watchface: WatchFaceModal,
  wordle: WordleModal,
  'youtube-thumbnails': YouTubeThumbnailsModal,
  snake: SnakeModal,
  'resume-timeline': ResumeTimelineModal,
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
      label: 'Tax',
      description: 'Vietnam PIT',
      emoji: '🇻🇳',
      color: '#ef4444',
      onClick: open('tax'),
    },
  ],
  casino: [
    {
      label: 'Blackjack',
      description: 'Cards Counter',
      emoji: '🃏',
      color: '#f59e0b',
      onClick: open('blackjack'),
    },
    {
      label: 'Poker',
      description: 'Odds Calculator',
      emoji: '🃏',
      color: '#f59e0b',
      onClick: open('poker'),
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
      label: 'Cron',
      description: 'Expression Builder',
      emoji: '🕒',
      color: '#8b5cf6',
      onClick: open('cron'),
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
      label: 'Leet Speak',
      description: 'From Text',
      emoji: '🔐',
      color: '#10b981',
      onClick: open('leetspeak'),
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
      label: 'Regex',
      description: 'Pattern Generator',
      emoji: '🔍',
      color: '#3b82f6',
      onClick: open('regex'),
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
      label: '2048',
      description: 'Merge tiles',
      emoji: '🔢',
      color: '#f59e0b',
      onClick: open('game2048'),
    },
    {
      label: 'Palindrome',
      description: 'Palindrome',
      emoji: '🔁',
      color: '#f59e0b',
      onClick: open('palindrome'),
    },
    {
      label: 'PD',
      description: "Prisoner's Dilemma",
      emoji: '⚖️',
      color: '#f59e0b',
      onClick: open('pd'),
    },
    {
      label: 'Sudoku',
      description: '4×4 & 9×9',
      emoji: '🧩',
      color: '#f59e0b',
      onClick: open('sudoku'),
    },
    {
      label: 'Snake',
      description: '12×12 grid',
      emoji: '🐍',
      color: '#f59e0b',
      onClick: open('snake'),
    },
    {
      label: 'Pokedex',
      description: 'Pokemon',
      emoji: '📕',
      color: '#f59e0b',
      onClick: open('pokedex'),
    },
    {
      label: 'RPS',
      description: 'Rock Paper Scissors',
      emoji: '✂️',
      color: '#f59e0b',
      onClick: open('rps'),
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
  memory: [
    {
      label: 'PI',
      description: 'Memorization',
      emoji: 'π',
      color: '#f59e0b',
      onClick: open('pi'),
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
    {
      label: 'Resume',
      description: 'Timeline',
      emoji: '⏳',
      color: '#ef4444',
      onClick: open('resume-timeline'),
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

type MainTab = 'bookmarks' | 'downloads' | 'tools';

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
      casino,
      clocks,
      converters,
      editors,
      education,
      eyes,
      games,
      memory,
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
        { label: 'Casino', items: casino },
        { label: 'Clocks', items: clocks },
        { label: 'Converters', items: converters },
        { label: 'Editors', items: editors },
        { label: 'Education', items: education },
        { label: 'Eyes', items: eyes },
        { label: 'Games', items: games },
        { label: 'Memory', items: memory },
        { label: 'Images', items: images },
        { label: 'Visualization', items: visualization },
      ],
      [
        tools,
        calculators,
        casino,
        clocks,
        converters,
        editors,
        education,
        eyes,
        games,
        memory,
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

    // Auto-switch tab when filtering produces results in another tab
    useEffect(() => {
      if (!filtering) return;
      const hasTools = filteredTools.some((s) => s.filtered.length > 0);
      const hasBookmarks = filteredBookmarks.some((s) => s.filtered.length > 0);
      const hasDownloads = filteredDownloads.some((s) => s.filtered.length > 0);
      if (tab === 'tools' && !hasTools && hasBookmarks) setTab('bookmarks');
      else if (tab === 'bookmarks' && !hasBookmarks && hasTools)
        setTab('tools');
      else if (tab === 'downloads' && !hasDownloads && hasTools)
        setTab('tools');

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const hasAnyResult =
      filteredBookmarks.some((s) => s.filtered.length > 0) ||
      filteredTools.some((s) => s.filtered.length > 0) ||
      filteredDownloads.some((s) => s.filtered.length > 0);

    const TABS: { id: MainTab; label: string; emoji: string }[] = [
      { id: 'bookmarks', label: 'Bookmarks', emoji: '🔖' },
      { id: 'downloads', label: 'Downloads', emoji: '📦' },
      { id: 'tools', label: 'Tools', emoji: '🔧' },
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

export const Start: FC = () => {
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
        label: 'Casino',
        items: f(toolSections.casino, 'label'),
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
        label: 'Memory',
        items: f(toolSections.memory, 'label'),
        Card: ToolCard,
      },
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
