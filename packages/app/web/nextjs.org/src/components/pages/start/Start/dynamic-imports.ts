import dynamic from 'next/dynamic';

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
export const BarcodeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BarcodeModal').then(
      (mod) => mod.BarcodeModal
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
export const LoremIpsumModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/LoremIpsumModal').then(
      (mod) => mod.LoremIpsumModal
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
export const DaysCountModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/DaysCountModal').then(
      (mod) => mod.DaysCountModal
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
export const PdfCombineModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfCombineModal').then(
      (mod) => mod.PdfCombineModal
    ),
  { ssr: false }
);
export const PdfEditModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfEditModal').then(
      (mod) => mod.PdfEditModal
    ),
  { ssr: false }
);
export const PdfExtractModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfExtractModal').then(
      (mod) => mod.PdfExtractModal
    ),
  { ssr: false }
);
export const PdfInspectModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfInspectModal').then(
      (mod) => mod.PdfInspectModal
    ),
  { ssr: false }
);
export const PdfMaintainModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfMaintainModal').then(
      (mod) => mod.PdfMaintainModal
    ),
  { ssr: false }
);
export const PdfSecurityModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfSecurityModal').then(
      (mod) => mod.PdfSecurityModal
    ),
  { ssr: false }
);
export const FileConvertModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/FileConvertModal').then(
      (mod) => mod.FileConvertModal
    ),
  { ssr: false }
);
export const ImageAiModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageAiModal').then(
      (mod) => mod.ImageAiModal
    ),
  { ssr: false }
);
export const ImageConvertModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageConvertModal').then(
      (mod) => mod.ImageConvertModal
    ),
  { ssr: false }
);
export const ImageEditModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageEditModal').then(
      (mod) => mod.ImageEditModal
    ),
  { ssr: false }
);
export const PdfArrangeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfArrangeModal').then(
      (mod) => mod.PdfArrangeModal
    ),
  { ssr: false }
);
export const PdfConvertModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfConvertModal').then(
      (mod) => mod.PdfConvertModal
    ),
  { ssr: false }
);
export const VideoConvertModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoConvertModal').then(
      (mod) => mod.VideoConvertModal
    ),
  { ssr: false }
);
export const VideoEditModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoEditModal').then(
      (mod) => mod.VideoEditModal
    ),
  { ssr: false }
);
export const VideoProcessModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoProcessModal').then(
      (mod) => mod.VideoProcessModal
    ),
  { ssr: false }
);
export const TextToolsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/TextToolsModal').then(
      (mod) => mod.TextToolsModal
    ),
  { ssr: false }
);
export const ScreenRecorderModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ScreenRecorderModal').then(
      (mod) => mod.ScreenRecorderModal
    ),
  { ssr: false }
);
export const ImageCombinerModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageCombinerModal').then(
      (mod) => mod.ImageCombinerModal
    ),
  { ssr: false }
);
export const WriteGenerateModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteGenerateModal').then(
      (mod) => mod.WriteGenerateModal
    ),
  { ssr: false }
);
export const WriteImproveModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteImproveModal').then(
      (mod) => mod.WriteImproveModal
    ),
  { ssr: false }
);
export const WriteSocialModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteSocialModal').then(
      (mod) => mod.WriteSocialModal
    ),
  { ssr: false }
);
export const GraphModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/GraphModal').then(
      (mod) => mod.GraphModal
    ),
  { ssr: false }
);
export const VideoDownloadModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoDownloadModal').then(
      (mod) => mod.VideoDownloadModal
    ),
  { ssr: false }
);
export const VideoAudioModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoAudioModal').then(
      (mod) => mod.VideoAudioModal
    ),
  { ssr: false }
);
export const WriteBusinessModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteBusinessModal').then(
      (mod) => mod.WriteBusinessModal
    ),
  { ssr: false }
);
export const WriteMarketingModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteMarketingModal').then(
      (mod) => mod.WriteMarketingModal
    ),
  { ssr: false }
);
export const WriteLegalModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteLegalModal').then(
      (mod) => mod.WriteLegalModal
    ),
  { ssr: false }
);
export const FileArchiveModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/FileArchiveModal').then(
      (mod) => mod.FileArchiveModal
    ),
  { ssr: false }
);
export const ImageCreateModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageCreateModal').then(
      (mod) => mod.ImageCreateModal
    ),
  { ssr: false }
);
export const ImageOcrModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageOcrModal').then(
      (mod) => mod.ImageOcrModal
    ),
  { ssr: false }
);
export const ImageBlurModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageBlurModal').then(
      (mod) => mod.ImageBlurModal
    ),
  { ssr: false }
);
export const WriteContentModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteContentModal').then(
      (mod) => mod.WriteContentModal
    ),
  { ssr: false }
);
export const PdfCreateModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfCreateModal').then(
      (mod) => mod.PdfCreateModal
    ),
  { ssr: false }
);
export const PdfTranslateModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfTranslateModal').then(
      (mod) => mod.PdfTranslateModal
    ),
  { ssr: false }
);

export const ImageFilterModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageFilterModal').then(
      (mod) => mod.ImageFilterModal
    ),
  { ssr: false }
);

export const ImageEffectModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageEffectModal').then(
      (mod) => mod.ImageEffectModal
    ),
  { ssr: false }
);

export const PdfEsignModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfEsignModal').then(
      (mod) => mod.PdfEsignModal
    ),
  { ssr: false }
);
