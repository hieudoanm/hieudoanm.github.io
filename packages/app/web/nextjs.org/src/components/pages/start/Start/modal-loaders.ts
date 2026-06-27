import { ComponentType, lazy } from 'react';

import { ModalId } from './types';

type ModalComponent = ComponentType<{ onClose: () => void }>;

const loaders: Record<string, () => Promise<{ default: ModalComponent }>> = {
  calculator: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/CalculatorModal').then(
      (m) => ({ default: m.CalculatorModal })
    ),
  converter: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/ConverterModal').then(
      (m) => ({ default: m.ConverterModal })
    ),
  elo: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/EloModal').then(
      (m) => ({ default: m.EloModal })
    ),
  inflation: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/InflationModal').then(
      (m) => ({ default: m.InflationModal })
    ),
  tax: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/TaxModal').then(
      (m) => ({ default: m.TaxModal })
    ),
  'split-bill': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/SplitBillModal').then(
      (m) => ({ default: m.SplitBillModal })
    ),
  'days-count': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/DaysCountModal').then(
      (m) => ({ default: m.DaysCountModal })
    ),
  blackjack: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/BlackjackModal').then(
      (m) => ({ default: m.BlackjackModal })
    ),
  poker: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/PokerModal').then(
      (m) => ({ default: m.PokerModal })
    ),
  'chess-clock': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/ChessClockModal').then(
      (m) => ({ default: m.ChessClockModal })
    ),
  countdown: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CountdownModal').then(
      (m) => ({ default: m.CountdownModal })
    ),
  cron: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CronModal').then(
      (m) => ({ default: m.CronModal })
    ),
  pomodoro: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/PomodoroModal').then(
      (m) => ({ default: m.PomodoroModal })
    ),
  watchface: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/WatchfaceModal').then(
      (m) => ({ default: m.WatchFaceModal })
    ),
  braille: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/BrailleModal').then(
      (m) => ({ default: m.BrailleModal })
    ),
  colors: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/ColorsModal').then(
      (m) => ({ default: m.ColorsModal })
    ),
  leetspeak: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/LeetSpeakModal').then(
      (m) => ({ default: m.LeetSpeakModal })
    ),
  'lorem-ipsum': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/LoremIpsumModal').then(
      (m) => ({ default: m.LoremIpsumModal })
    ),
  morse: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/MorseModal').then(
      (m) => ({ default: m.MorseModal })
    ),
  openapi: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/OpenAPI2Postman').then(
      (m) => ({ default: m.OpenAPI2Postman })
    ),
  'file-convert': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/FileConvertModal').then(
      (m) => ({ default: m.FileConvertModal })
    ),
  'file-archive': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/FileArchiveModal').then(
      (m) => ({ default: m.FileArchiveModal })
    ),
  regex: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/RegexModal').then(
      (m) => ({ default: m.RegexModal })
    ),
  'json-schema': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/JSONSchemaModal').then(
      (m) => ({ default: m.JSONSchemaModal })
    ),
  manifest: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ManifestModal').then(
      (m) => ({ default: m.ManifestModal })
    ),
  markdown: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/MarkdownModal').then(
      (m) => ({ default: m.MarkdownModal })
    ),
  resume: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ResumeModal').then(
      (m) => ({ default: m.ResumeModal })
    ),
  slides: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/SlidesModal').then(
      (m) => ({ default: m.SlidesModal })
    ),
  english: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/EnglishModal').then(
      (m) => ({ default: m.LanguagesEnglishModal })
    ),
  flashcards: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/FlashcardsModal').then(
      (m) => ({ default: m.FlashcardsModal })
    ),
  sign: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/SignModal').then(
      (m) => ({ default: m.SignModal })
    ),
  'periodic-table': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/chemistry/PeriodicTableModal').then(
      (m) => ({ default: m.PeriodicTableModal })
    ),
  pitch: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/music/PitchModal').then(
      (m) => ({ default: m.PitchModal })
    ),
  doi: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/academic/DOIModal').then(
      (m) => ({ default: m.DOIModal })
    ),
  logmar: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/LogMARChartModal').then(
      (m) => ({ default: m.LogMARChartModal })
    ),
  snellen: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/SnellenChartModal').then(
      (m) => ({ default: m.SnellenChartModal })
    ),
  'tumbling-e': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/TumblingEChartModal').then(
      (m) => ({ default: m.TumblingEChartModal })
    ),
  game2048: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/Game2048Modal').then(
      (m) => ({ default: m.Game2048Modal })
    ),
  palindrome: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PalindromeModal').then(
      (m) => ({ default: m.PalindromeModal })
    ),
  pd: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PrisonerDilemmaModal').then(
      (m) => ({ default: m.PrisonerDilemmaModal })
    ),
  pokedex: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PokedexModal').then(
      (m) => ({ default: m.PokedexModal })
    ),
  rps: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/RockPaperScissorsModal').then(
      (m) => ({ default: m.RockPaperScissorsModal })
    ),
  sudoku: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SudokuModal').then(
      (m) => ({ default: m.SudokuModal })
    ),
  t3: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/T3Modal').then(
      (m) => ({ default: m.T3Modal })
    ),
  towers: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TowersModal').then(
      (m) => ({ default: m.TowersModal })
    ),
  typoglycemia: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TypoglycemiaModal').then(
      (m) => ({ default: m.TypoglycemiaModal })
    ),
  wordle: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/WordleModal').then(
      (m) => ({ default: m.WordleModal })
    ),
  snake: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SnakeModal').then(
      (m) => ({ default: m.SnakeModal })
    ),
  barcode: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BarcodeModal').then(
      (m) => ({ default: m.BarcodeModal })
    ),
  base64: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/Base64Modal').then(
      (m) => ({ default: m.Base64Modal })
    ),
  'breaking-bad': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BreakingBadModal').then(
      (m) => ({ default: m.BreakingBadModal })
    ),
  camera: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/CameraModal').then(
      (m) => ({ default: m.CameraModal })
    ),
  'github-social-preview': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/GitHubSocialPreviewModal').then(
      (m) => ({ default: m.GitHubSocialPreviewModal })
    ),
  house: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/HouseModal').then(
      (m) => ({ default: m.HouseModal })
    ),
  'image-ai': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageAiModal').then(
      (m) => ({ default: m.ImageAiModal })
    ),
  'image-blur': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageBlurModal').then(
      (m) => ({ default: m.ImageBlurModal })
    ),
  'image-combiner': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageCombinerModal').then(
      (m) => ({ default: m.ImageCombinerModal })
    ),
  'image-convert': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageConvertModal').then(
      (m) => ({ default: m.ImageConvertModal })
    ),
  'image-create': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageCreateModal').then(
      (m) => ({ default: m.ImageCreateModal })
    ),
  'image-edit': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageEditModal').then(
      (m) => ({ default: m.ImageEditModal })
    ),
  'image-filter': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageFilterModal').then(
      (m) => ({ default: m.ImageFilterModal })
    ),
  'image-effect': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageEffectModal').then(
      (m) => ({ default: m.ImageEffectModal })
    ),
  'image-ocr': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageOcrModal').then(
      (m) => ({ default: m.ImageOcrModal })
    ),
  'image-profile': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageProfileModal').then(
      (m) => ({ default: m.ImageProfileModal })
    ),
  instasize: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InstaSizeModal').then(
      (m) => ({ default: m.InstaSizeModal })
    ),
  'invoice-parser': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InvoiceParserModal').then(
      (m) => ({ default: m.InvoiceParserModal })
    ),
  qr: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/QRCodeModal').then(
      (m) => ({ default: m.QRCodeModal })
    ),
  'youtube-thumbnails': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/YouTubeThumbnailsModal').then(
      (m) => ({ default: m.YouTubeThumbnailsModal })
    ),
  pi: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/PiNumberModal').then(
      (m) => ({ default: m.PiModal })
    ),
  pixel: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/PixelModal').then(
      (m) => ({ default: m.PixelModal })
    ),
  quizify: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/QuizifyModal').then(
      (m) => ({ default: m.QuizifyModal })
    ),
  recall: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/RecallModal').then(
      (m) => ({ default: m.RecallModal })
    ),
  'pdf-arrange': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfArrangeModal').then(
      (m) => ({ default: m.PdfArrangeModal })
    ),
  'pdf-combine': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfCombineModal').then(
      (m) => ({ default: m.PdfCombineModal })
    ),
  'pdf-convert': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfConvertModal').then(
      (m) => ({ default: m.PdfConvertModal })
    ),
  'pdf-create': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfCreateModal').then(
      (m) => ({ default: m.PdfCreateModal })
    ),
  'pdf-edit': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfEditModal').then(
      (m) => ({ default: m.PdfEditModal })
    ),
  'pdf-extract': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfExtractModal').then(
      (m) => ({ default: m.PdfExtractModal })
    ),
  'pdf-inspect': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfInspectModal').then(
      (m) => ({ default: m.PdfInspectModal })
    ),
  'pdf-maintain': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfMaintainModal').then(
      (m) => ({ default: m.PdfMaintainModal })
    ),
  'pdf-security': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfSecurityModal').then(
      (m) => ({ default: m.PdfSecurityModal })
    ),
  'pdf-translate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfTranslateModal').then(
      (m) => ({ default: m.PdfTranslateModal })
    ),
  'pdf-esign': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfEsignModal').then(
      (m) => ({ default: m.PdfEsignModal })
    ),
  chat: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ChatModal/ChatModal').then(
      (m) => ({ default: m.ChatModal })
    ),
  clipboard: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ClipboardModal').then(
      (m) => ({ default: m.ClipboardModal })
    ),
  emojis: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/EmojisModal').then(
      (m) => ({ default: m.EmojisModal })
    ),
  figlet: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/FigletModal').then(
      (m) => ({ default: m.FigletModal })
    ),
  ip: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/IPModal').then(
      (m) => ({ default: m.IPModal })
    ),
  kaprekar: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/KaprekarModal').then(
      (m) => ({ default: m.KaprekarModal })
    ),
  'no-sleep': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/NoSleepModal').then(
      (m) => ({ default: m.NoSleepModal })
    ),
  proxy: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ProxyModal').then(
      (m) => ({ default: m.ProxyModal })
    ),
  'shopify-detect': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ShopifyDetectModal').then(
      (m) => ({ default: m.ShopifyDetectModal })
    ),
  svg: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SVGModal').then(
      (m) => ({ default: m.SVGModal })
    ),
  uuid: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/UUIDModal').then(
      (m) => ({ default: m.UUIDModal })
    ),
  'text-tools': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/TextToolsModal').then(
      (m) => ({ default: m.TextToolsModal })
    ),
  'screen-recorder': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ScreenRecorderModal').then(
      (m) => ({ default: m.ScreenRecorderModal })
    ),
  sheets: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SheetsModal').then(
      (m) => ({ default: m.SheetsModal })
    ),
  'video-convert': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoConvertModal').then(
      (m) => ({ default: m.VideoConvertModal })
    ),
  'video-edit': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoEditModal').then(
      (m) => ({ default: m.VideoEditModal })
    ),
  'video-process': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoProcessModal').then(
      (m) => ({ default: m.VideoProcessModal })
    ),
  'video-download': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoDownloadModal').then(
      (m) => ({ default: m.VideoDownloadModal })
    ),
  'video-audio': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoAudioModal').then(
      (m) => ({ default: m.VideoAudioModal })
    ),
  'audio-to-text': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/AudioToTextModal').then(
      (m) => ({ default: m.AudioToTextModal })
    ),
  'calendar-tracker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker').then(
      (m) => ({ default: m.CalendarTrackerModal })
    ),
  legislation: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/LegislationModal').then(
      (m) => ({ default: m.LegislationModal })
    ),
  graph: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/GraphModal').then(
      (m) => ({ default: m.GraphModal })
    ),
  'resume-timeline': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/ResumeTimelineModal').then(
      (m) => ({ default: m.ResumeTimelineModal })
    ),
  'write-generate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteGenerateModal').then(
      (m) => ({ default: m.WriteGenerateModal })
    ),
  'write-improve': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteImproveModal').then(
      (m) => ({ default: m.WriteImproveModal })
    ),
  'write-social': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteSocialModal').then(
      (m) => ({ default: m.WriteSocialModal })
    ),
  'write-business': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteBusinessModal').then(
      (m) => ({ default: m.WriteBusinessModal })
    ),
  'write-marketing': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteMarketingModal').then(
      (m) => ({ default: m.WriteMarketingModal })
    ),
  'write-legal': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteLegalModal').then(
      (m) => ({ default: m.WriteLegalModal })
    ),
  'write-content': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteContentModal').then(
      (m) => ({ default: m.WriteContentModal })
    ),
  'write-real-estate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteRealEstateModal').then(
      (m) => ({ default: m.WriteRealEstateModal })
    ),
};

const cache = new Map<string, ModalComponent>();

export const getModalComponent = (id: ModalId): ModalComponent | null => {
  const existing = cache.get(id);
  if (existing) return existing;

  const factory = loaders[id];
  if (!factory) return null;

  const Lazy = lazy(factory);
  cache.set(id, Lazy);
  return Lazy;
};
