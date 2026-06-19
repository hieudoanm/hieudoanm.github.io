import dynamic from 'next/dynamic';

export const RedactModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/RedactModal').then(
      (mod) => mod.RedactModal
    ),
  { ssr: false }
);
export const RegexModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/RegexModal').then(
      (mod) => mod.RegexModal
    ),
  { ssr: false }
);
export const InstaSizeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InstaSizeModal').then(
      (mod) => mod.InstaSizeModal
    ),
  { ssr: false }
);
export const InvoiceParserModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InvoiceParserModal').then(
      (mod) => mod.InvoiceParserModal
    ),
  { ssr: false }
);
export const CameraModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/CameraModal').then(
      (mod) => mod.CameraModal
    ),
  { ssr: false }
);
export const SignModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/SignModal').then(
      (mod) => mod.SignModal
    ),
  { ssr: false }
);
export const Game2048Modal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/Game2048Modal').then(
      (mod) => mod.Game2048Modal
    ),
  { ssr: false }
);
export const Base64Modal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/Base64Modal').then(
      (mod) => mod.Base64Modal
    ),
  { ssr: false }
);
export const BlackjackModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/BlackjackModal').then(
      (mod) => mod.BlackjackModal
    ),
  { ssr: false }
);
export const BrailleModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/BrailleModal').then(
      (mod) => mod.BrailleModal
    ),
  { ssr: false }
);
export const LeetSpeakModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/LeetSpeakModal').then(
      (mod) => mod.LeetSpeakModal
    ),
  { ssr: false }
);
export const BreakingBadModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BreakingBadModal').then(
      (mod) => mod.BreakingBadModal
    ),
  { ssr: false }
);
export const CalculatorModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/CalculatorModal').then(
      (mod) => mod.CalculatorModal
    ),
  { ssr: false }
);
export const CalendarTrackerModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker').then(
      (mod) => mod.CalendarTrackerModal
    ),
  { ssr: false }
);
export const ChatModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ChatModal/ChatModal').then(
      (mod) => mod.ChatModal
    ),
  { ssr: false }
);
export const ChessClockModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/ChessClockModal').then(
      (mod) => mod.ChessClockModal
    ),
  { ssr: false }
);
export const ClipboardModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ClipboardModal').then(
      (mod) => mod.ClipboardModal
    ),
  { ssr: false }
);
export const ColorsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/ColorsModal').then(
      (mod) => mod.ColorsModal
    ),
  { ssr: false }
);
export const ConverterModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/ConverterModal').then(
      (mod) => mod.ConverterModal
    ),
  { ssr: false }
);
export const CountdownModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CountdownModal').then(
      (mod) => mod.CountdownModal
    ),
  { ssr: false }
);
export const CronModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CronModal').then(
      (mod) => mod.CronModal
    ),
  { ssr: false }
);
export const DOIModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/academic/DOIModal').then(
      (mod) => mod.DOIModal
    ),
  { ssr: false }
);
export const EloModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/EloModal').then(
      (mod) => mod.EloModal
    ),
  { ssr: false }
);
export const EmojisModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/EmojisModal').then(
      (mod) => mod.EmojisModal
    ),
  { ssr: false }
);
export const FigletModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/FigletModal').then(
      (mod) => mod.FigletModal
    ),
  { ssr: false }
);
export const FlashcardsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/FlashcardsModal').then(
      (mod) => mod.FlashcardsModal
    ),
  { ssr: false }
);
export const GitHubSocialPreviewModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/GitHubSocialPreviewModal').then(
      (mod) => mod.GitHubSocialPreviewModal
    ),
  { ssr: false }
);
export const HouseModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/HouseModal').then(
      (mod) => mod.HouseModal
    ),
  { ssr: false }
);
export const InflationModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/InflationModal').then(
      (mod) => mod.InflationModal
    ),
  { ssr: false }
);
export const IPModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/IPModal').then(
      (mod) => mod.IPModal
    ),
  { ssr: false }
);
export const JSONSchemaModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/JSONSchemaModal').then(
      (mod) => mod.JSONSchemaModal
    ),
  { ssr: false }
);
export const KaprekarModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/KaprekarModal').then(
      (mod) => mod.KaprekarModal
    ),
  { ssr: false }
);
export const LegislationModal = dynamic(
  () =>
    import('../modals/visualization/LegislationModal').then(
      (mod) => mod.LegislationModal
    ),
  { ssr: false }
);
export const LanguagesEnglishModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/EnglishModal').then(
      (mod) => mod.LanguagesEnglishModal
    ),
  { ssr: false }
);
export const LogMARChartModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/LogMARChartModal').then(
      (mod) => mod.LogMARChartModal
    ),
  { ssr: false }
);
export const ManifestModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ManifestModal').then(
      (mod) => mod.ManifestModal
    ),
  { ssr: false }
);
export const MarkdownModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/MarkdownModal').then(
      (mod) => mod.MarkdownModal
    ),
  { ssr: false }
);
export const MorseModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/MorseModal').then(
      (mod) => mod.MorseModal
    ),
  { ssr: false }
);
export const NoSleepModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/NoSleepModal').then(
      (mod) => mod.NoSleepModal
    ),
  { ssr: false }
);
export const OpenAPI2Postman = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/OpenAPI2Postman').then(
      (mod) => mod.OpenAPI2Postman
    ),
  { ssr: false }
);
export const PalindromeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PalindromeModal').then(
      (mod) => mod.PalindromeModal
    ),
  { ssr: false }
);
export const PeriodicTableModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/chemistry/PeriodicTableModal').then(
      (mod) => mod.PeriodicTableModal
    ),
  { ssr: false }
);
export const PiModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/PiNumberModal').then(
      (mod) => mod.PiModal
    ),
  { ssr: false }
);
export const PitchModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/music/PitchModal').then(
      (mod) => mod.PitchModal
    ),
  { ssr: false }
);
export const PdModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PrisonerDilemmaModal').then(
      (mod) => mod.PrisonerDilemmaModal
    ),
  { ssr: false }
);
export const PokedexModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PokedexModal').then(
      (mod) => mod.PokedexModal
    ),
  { ssr: false }
);
export const PokerModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/PokerModal').then(
      (mod) => mod.PokerModal
    ),
  { ssr: false }
);
export const PomodoroModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/PomodoroModal').then(
      (mod) => mod.PomodoroModal
    ),
  { ssr: false }
);
export const ProxyModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ProxyModal').then(
      (mod) => mod.ProxyModal
    ),
  { ssr: false }
);
export const QRCodeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/QRCodeModal').then(
      (mod) => mod.QRCodeModal
    ),
  { ssr: false }
);
export const QuizifyModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/QuizifyModal').then(
      (mod) => mod.QuizifyModal
    ),
  { ssr: false }
);
export const RecallModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/RecallModal').then(
      (mod) => mod.RecallModal
    ),
  { ssr: false }
);
export const RockPaperScissorsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/RockPaperScissorsModal').then(
      (mod) => mod.RockPaperScissorsModal
    ),
  { ssr: false }
);
export const ResumeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ResumeModal').then(
      (mod) => mod.ResumeModal
    ),
  { ssr: false }
);
export const SheetsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SheetsModal').then(
      (mod) => mod.SheetsModal
    ),
  { ssr: false }
);
export const ShopifyDetectModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ShopifyDetectModal').then(
      (mod) => mod.ShopifyDetectModal
    ),
  { ssr: false }
);
export const SlidesModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/SlidesModal').then(
      (mod) => mod.SlidesModal
    ),
  { ssr: false }
);
export const SnellenChartModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/SnellenChartModal').then(
      (mod) => mod.SnellenChartModal
    ),
  { ssr: false }
);
export const SVGModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SVGModal').then(
      (mod) => mod.SVGModal
    ),
  { ssr: false }
);
export const SudokuModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SudokuModal').then(
      (mod) => mod.SudokuModal
    ),
  { ssr: false }
);
export const T3Modal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/T3Modal').then(
      (mod) => mod.T3Modal
    ),
  { ssr: false }
);
export const TaxModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/TaxModal').then(
      (mod) => mod.TaxModal
    ),
  { ssr: false }
);
export const SplitBillModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/SplitBillModal').then(
      (mod) => mod.SplitBillModal
    ),
  { ssr: false }
);
export const TowersModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TowersModal').then(
      (mod) => mod.TowersModal
    ),
  { ssr: false }
);
export const TumblingEChartModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/TumblingEChartModal').then(
      (mod) => mod.TumblingEChartModal
    ),
  { ssr: false }
);
export const TypoglycemiaModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TypoglycemiaModal').then(
      (mod) => mod.TypoglycemiaModal
    ),
  { ssr: false }
);
export const UUIDModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/UUIDModal').then(
      (mod) => mod.UUIDModal
    ),
  { ssr: false }
);
export const WatchFaceModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/WatchfaceModal').then(
      (mod) => mod.WatchFaceModal
    ),
  { ssr: false }
);
export const WordleModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/WordleModal').then(
      (mod) => mod.WordleModal
    ),
  { ssr: false }
);
export const YouTubeThumbnailsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/YouTubeThumbnailsModal').then(
      (mod) => mod.YouTubeThumbnailsModal
    ),
  { ssr: false }
);
export const SnakeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SnakeModal').then(
      (mod) => mod.SnakeModal
    ),
  { ssr: false }
);
export const ResumeTimelineModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/ResumeTimelineModal').then(
      (mod) => mod.ResumeTimelineModal
    ),
  { ssr: false }
);
