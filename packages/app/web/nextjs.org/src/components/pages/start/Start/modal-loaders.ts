import { ComponentType, lazy } from 'react';

import { ModalId } from './types';

type ModalComponent = ComponentType<{ onClose: () => void }>;

const loaders: Record<string, () => Promise<{ default: ModalComponent }>> = {
  'ai-art': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiArtModal').then(
      (m) => ({ default: m.AiArtModal })
    ),
  'ai-colorize': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiColorizeModal').then(
      (m) => ({ default: m.AiColorizeModal })
    ),
  'ai-generate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiGenerateModal').then(
      (m) => ({ default: m.AiGenerateModal })
    ),
  'ai-remove-bg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiRemoveBgModal').then(
      (m) => ({ default: m.AiRemoveBgModal })
    ),
  'ai-remove-object': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiRemoveObjectModal').then(
      (m) => ({ default: m.AiRemoveObjectModal })
    ),
  'ai-remove-person': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiRemovePersonModal').then(
      (m) => ({ default: m.AiRemovePersonModal })
    ),
  'ai-remove-watermark': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiRemoveWatermarkModal').then(
      (m) => ({ default: m.AiRemoveWatermarkModal })
    ),
  'ai-restore': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiRestoreModal').then(
      (m) => ({ default: m.AiRestoreModal })
    ),
  'ai-unblur': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiUnblurModal').then(
      (m) => ({ default: m.AiUnblurModal })
    ),
  'ai-upscale': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/AiUpscaleModal').then(
      (m) => ({ default: m.AiUpscaleModal })
    ),
  angle: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/AngleModal').then(
      (m) => ({ default: m.AngleModal })
    ),
  'audio-to-text': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/AudioToTextModal').then(
      (m) => ({ default: m.AudioToTextModal })
    ),
  barcode: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BarcodeModal').then(
      (m) => ({ default: m.BarcodeModal })
    ),
  'barcode-read': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BarcodeReadModal').then(
      (m) => ({ default: m.BarcodeReadModal })
    ),
  base: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/BaseModal').then(
      (m) => ({ default: m.BaseModal })
    ),
  base64: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/Base64Modal').then(
      (m) => ({ default: m.Base64Modal })
    ),
  blackjack: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/BlackjackModal').then(
      (m) => ({ default: m.BlackjackModal })
    ),
  braille: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/BrailleModal').then(
      (m) => ({ default: m.BrailleModal })
    ),
  'breaking-bad': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/BreakingBadModal').then(
      (m) => ({ default: m.BreakingBadModal })
    ),
  calculator: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/CalculatorModal').then(
      (m) => ({ default: m.CalculatorModal })
    ),
  'calendar-tracker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker').then(
      (m) => ({ default: m.CalendarTrackerModal })
    ),
  camera: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/CameraModal').then(
      (m) => ({ default: m.CameraModal })
    ),
  'chart-maker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ChartMakerModal').then(
      (m) => ({ default: m.ChartMakerModal })
    ),
  chat: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ChatModal/ChatModal').then(
      (m) => ({ default: m.ChatModal })
    ),
  'chess-clock': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/ChessClockModal').then(
      (m) => ({ default: m.ChessClockModal })
    ),
  clipboard: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ClipboardModal').then(
      (m) => ({ default: m.ClipboardModal })
    ),
  'collage-maker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/CollageMakerModal').then(
      (m) => ({ default: m.CollageMakerModal })
    ),
  colors: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/ColorsModal').then(
      (m) => ({ default: m.ColorsModal })
    ),
  'contrast-checker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ContrastCheckerModal').then(
      (m) => ({ default: m.ContrastCheckerModal })
    ),
  countdown: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CountdownModal').then(
      (m) => ({ default: m.CountdownModal })
    ),
  'create-zip': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/CreateZipModal').then(
      (m) => ({ default: m.CreateZipModal })
    ),
  cron: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CronModal').then(
      (m) => ({ default: m.CronModal })
    ),
  'csv-to-excel': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/CsvToExcelModal').then(
      (m) => ({ default: m.CsvToExcelModal })
    ),
  data: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/DataModal').then(
      (m) => ({ default: m.DataModal })
    ),
  'days-count': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/DaysCountModal').then(
      (m) => ({ default: m.DaysCountModal })
    ),
  doi: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/academic/DOIModal').then(
      (m) => ({ default: m.DOIModal })
    ),
  elo: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/EloModal').then(
      (m) => ({ default: m.EloModal })
    ),
  emojis: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/EmojisModal').then(
      (m) => ({ default: m.EmojisModal })
    ),
  english: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/EnglishModal').then(
      (m) => ({ default: m.LanguagesEnglishModal })
    ),
  'epoch-convert': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/EpochConvertModal').then(
      (m) => ({ default: m.EpochConvertModal })
    ),
  'excel-to-csv': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/ExcelToCsvModal').then(
      (m) => ({ default: m.ExcelToCsvModal })
    ),
  'excel-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/ExcelToPdfModal').then(
      (m) => ({ default: m.ExcelToPdfModal })
    ),
  'excel-to-xml': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/ExcelToXmlModal').then(
      (m) => ({ default: m.ExcelToXmlModal })
    ),
  figlet: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/FigletModal').then(
      (m) => ({ default: m.FigletModal })
    ),

  flashcards: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/FlashcardsModal').then(
      (m) => ({ default: m.FlashcardsModal })
    ),
  game2048: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/Game2048Modal').then(
      (m) => ({ default: m.Game2048Modal })
    ),
  'github-social-preview': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/GitHubSocialPreviewModal').then(
      (m) => ({ default: m.GitHubSocialPreviewModal })
    ),
  'gradient-generator': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/GradientGeneratorModal').then(
      (m) => ({ default: m.GradientGeneratorModal })
    ),
  graph: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/GraphModal').then(
      (m) => ({ default: m.GraphModal })
    ),
  house: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/HouseModal').then(
      (m) => ({ default: m.HouseModal })
    ),
  'image-adjust': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageAdjustModal').then(
      (m) => ({ default: m.ImageAdjustModal })
    ),

  'image-blur': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageBlurModal').then(
      (m) => ({ default: m.ImageBlurModal })
    ),
  'image-border': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageBorderModal').then(
      (m) => ({ default: m.ImageBorderModal })
    ),
  'image-bw': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageBwModal').then(
      (m) => ({ default: m.ImageBwModal })
    ),
  'image-colorize': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageColorizeModal').then(
      (m) => ({ default: m.ImageColorizeModal })
    ),
  'image-combiner': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageCombinerModal').then(
      (m) => ({ default: m.ImageCombinerModal })
    ),
  'image-compress': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageCompressModal').then(
      (m) => ({ default: m.ImageCompressModal })
    ),
  'image-convert': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageConvertModal').then(
      (m) => ({ default: m.ImageConvertModal })
    ),

  'image-crop': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageCropModal').then(
      (m) => ({ default: m.ImageCropModal })
    ),
  'image-dominant-color': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageDominantColorModal').then(
      (m) => ({ default: m.ImageDominantColorModal })
    ),

  'image-flip': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageFlipModal').then(
      (m) => ({ default: m.ImageFlipModal })
    ),
  'image-ocr': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageOcrModal').then(
      (m) => ({ default: m.ImageOcrModal })
    ),
  'image-photo-filters': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImagePhotoFiltersModal').then(
      (m) => ({ default: m.ImagePhotoFiltersModal })
    ),
  'image-pixelate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImagePixelateModal').then(
      (m) => ({ default: m.ImagePixelateModal })
    ),
  'image-profile': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageProfileModal').then(
      (m) => ({ default: m.ImageProfileModal })
    ),
  'image-resize': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageResizeModal').then(
      (m) => ({ default: m.ImageResizeModal })
    ),
  'image-rotate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageRotateModal').then(
      (m) => ({ default: m.ImageRotateModal })
    ),
  'image-round': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageRoundModal').then(
      (m) => ({ default: m.ImageRoundModal })
    ),
  'image-shadow': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageShadowModal').then(
      (m) => ({ default: m.ImageShadowModal })
    ),
  'image-sharpen': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageSharpenModal').then(
      (m) => ({ default: m.ImageSharpenModal })
    ),
  'image-split': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageSplitModal').then(
      (m) => ({ default: m.ImageSplitModal })
    ),
  'image-text': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageTextModal').then(
      (m) => ({ default: m.ImageTextModal })
    ),
  'image-transparent-bg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageTransparentBgModal').then(
      (m) => ({ default: m.ImageTransparentBgModal })
    ),
  'image-vignette': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageVignetteModal').then(
      (m) => ({ default: m.ImageVignetteModal })
    ),
  'image-watermark': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/ImageWatermarkModal').then(
      (m) => ({ default: m.ImageWatermarkModal })
    ),
  inflation: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/InflationModal').then(
      (m) => ({ default: m.InflationModal })
    ),
  instasize: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InstaSizeModal').then(
      (m) => ({ default: m.InstaSizeModal })
    ),
  'invoice-parser': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/InvoiceParserModal').then(
      (m) => ({ default: m.InvoiceParserModal })
    ),
  ip: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/IPModal').then(
      (m) => ({ default: m.IPModal })
    ),
  'json-schema': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/JSONSchemaModal').then(
      (m) => ({ default: m.JSONSchemaModal })
    ),
  kaprekar: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/KaprekarModal').then(
      (m) => ({ default: m.KaprekarModal })
    ),
  legislation: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/LegislationModal').then(
      (m) => ({ default: m.LegislationModal })
    ),
  leetspeak: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/LeetSpeakModal').then(
      (m) => ({ default: m.LeetSpeakModal })
    ),
  length: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/LengthModal').then(
      (m) => ({ default: m.LengthModal })
    ),
  logmar: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/LogMARChartModal').then(
      (m) => ({ default: m.LogMARChartModal })
    ),
  'lorem-ipsum': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/LoremIpsumModal').then(
      (m) => ({ default: m.LoremIpsumModal })
    ),
  manifest: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ManifestModal').then(
      (m) => ({ default: m.ManifestModal })
    ),
  markdown: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/MarkdownModal').then(
      (m) => ({ default: m.MarkdownModal })
    ),
  'meme-maker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/MemeMakerModal').then(
      (m) => ({ default: m.MemeMakerModal })
    ),
  morse: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/MorseModal').then(
      (m) => ({ default: m.MorseModal })
    ),
  'no-sleep': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/NoSleepModal').then(
      (m) => ({ default: m.NoSleepModal })
    ),
  openapi: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/OpenAPI2Postman').then(
      (m) => ({ default: m.OpenAPI2Postman })
    ),
  palindrome: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PalindromeModal').then(
      (m) => ({ default: m.PalindromeModal })
    ),
  pd: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PrisonerDilemmaModal').then(
      (m) => ({ default: m.PrisonerDilemmaModal })
    ),
  'periodic-table': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/chemistry/PeriodicTableModal').then(
      (m) => ({ default: m.PeriodicTableModal })
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
  'pdf-esign': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfEsignModal').then(
      (m) => ({ default: m.PdfEsignModal })
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
  pi: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/PiNumberModal').then(
      (m) => ({ default: m.PiModal })
    ),
  pixel: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/PixelModal').then(
      (m) => ({ default: m.PixelModal })
    ),
  pitch: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/music/PitchModal').then(
      (m) => ({ default: m.PitchModal })
    ),
  pokedex: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/PokedexModal').then(
      (m) => ({ default: m.PokedexModal })
    ),
  poker: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/PokerModal').then(
      (m) => ({ default: m.PokerModal })
    ),
  pomodoro: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/PomodoroModal').then(
      (m) => ({ default: m.PomodoroModal })
    ),
  proxy: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ProxyModal').then(
      (m) => ({ default: m.ProxyModal })
    ),
  qr: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/QRCodeModal').then(
      (m) => ({ default: m.QRCodeModal })
    ),
  'qr-read': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/QrReadModal').then(
      (m) => ({ default: m.QrReadModal })
    ),
  quizify: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/QuizifyModal').then(
      (m) => ({ default: m.QuizifyModal })
    ),
  recall: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/memory/RecallModal').then(
      (m) => ({ default: m.RecallModal })
    ),
  redact: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/RedactModal').then(
      (m) => ({ default: m.RedactModal })
    ),
  regex: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/RegexModal').then(
      (m) => ({ default: m.RegexModal })
    ),
  resume: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ResumeModal').then(
      (m) => ({ default: m.ResumeModal })
    ),
  'resume-timeline': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/ResumeTimelineModal').then(
      (m) => ({ default: m.ResumeTimelineModal })
    ),
  roman: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/RomanModal').then(
      (m) => ({ default: m.RomanModal })
    ),
  rps: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/RockPaperScissorsModal').then(
      (m) => ({ default: m.RockPaperScissorsModal })
    ),
  'screen-recorder': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ScreenRecorderModal').then(
      (m) => ({ default: m.ScreenRecorderModal })
    ),
  sheets: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SheetsModal').then(
      (m) => ({ default: m.SheetsModal })
    ),
  'shopify-detect': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/ShopifyDetectModal').then(
      (m) => ({ default: m.ShopifyDetectModal })
    ),
  sign: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/SignModal').then(
      (m) => ({ default: m.SignModal })
    ),
  slides: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/SlidesModal').then(
      (m) => ({ default: m.SlidesModal })
    ),
  snake: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SnakeModal').then(
      (m) => ({ default: m.SnakeModal })
    ),
  snellen: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/SnellenChartModal').then(
      (m) => ({ default: m.SnellenChartModal })
    ),
  'split-bill': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/SplitBillModal').then(
      (m) => ({ default: m.SplitBillModal })
    ),
  'split-csv': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/SplitCsvModal').then(
      (m) => ({ default: m.SplitCsvModal })
    ),
  'split-excel': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/SplitExcelModal').then(
      (m) => ({ default: m.SplitExcelModal })
    ),
  sudoku: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SudokuModal').then(
      (m) => ({ default: m.SudokuModal })
    ),
  svg: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/SVGModal').then(
      (m) => ({ default: m.SVGModal })
    ),
  t3: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/T3Modal').then(
      (m) => ({ default: m.T3Modal })
    ),
  tax: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/TaxModal').then(
      (m) => ({ default: m.TaxModal })
    ),
  temperature: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/TemperatureModal').then(
      (m) => ({ default: m.TemperatureModal })
    ),
  'text-case': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/TextCaseModal').then(
      (m) => ({ default: m.TextCaseModal })
    ),
  'text-diff': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/TextDiffModal').then(
      (m) => ({ default: m.TextDiffModal })
    ),
  'text-password': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/TextPasswordModal').then(
      (m) => ({ default: m.TextPasswordModal })
    ),

  'text-url-tracer': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/TextUrlTracerModal').then(
      (m) => ({ default: m.TextUrlTracerModal })
    ),
  'text-word-count': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/TextWordCountModal').then(
      (m) => ({ default: m.TextWordCountModal })
    ),
  time: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/TimeModal').then(
      (m) => ({ default: m.TimeModal })
    ),
  towers: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TowersModal').then(
      (m) => ({ default: m.TowersModal })
    ),
  'tumbling-e': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/TumblingEChartModal').then(
      (m) => ({ default: m.TumblingEChartModal })
    ),
  typoglycemia: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/TypoglycemiaModal').then(
      (m) => ({ default: m.TypoglycemiaModal })
    ),
  uuid: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/tools/UUIDModal').then(
      (m) => ({ default: m.UUIDModal })
    ),
  'video-audio': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoAudioModal').then(
      (m) => ({ default: m.VideoAudioModal })
    ),
  'video-convert': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoConvertModal').then(
      (m) => ({ default: m.VideoConvertModal })
    ),
  'video-download': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoDownloadModal').then(
      (m) => ({ default: m.VideoDownloadModal })
    ),
  'video-edit': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoEditModal').then(
      (m) => ({ default: m.VideoEditModal })
    ),
  'video-process': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/VideoProcessModal').then(
      (m) => ({ default: m.VideoProcessModal })
    ),
  watchface: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/WatchfaceModal').then(
      (m) => ({ default: m.WatchFaceModal })
    ),
  weight: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/WeightModal').then(
      (m) => ({ default: m.WeightModal })
    ),
  'word-counter': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/WordCounterModal').then(
      (m) => ({ default: m.WordCounterModal })
    ),
  wordle: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/WordleModal').then(
      (m) => ({ default: m.WordleModal })
    ),
  'write-business': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteBusinessModal').then(
      (m) => ({ default: m.WriteBusinessModal })
    ),
  'write-content': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteContentModal').then(
      (m) => ({ default: m.WriteContentModal })
    ),
  'write-generate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteGenerateModal').then(
      (m) => ({ default: m.WriteGenerateModal })
    ),
  'write-improve': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteImproveModal').then(
      (m) => ({ default: m.WriteImproveModal })
    ),
  'write-legal': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteLegalModal').then(
      (m) => ({ default: m.WriteLegalModal })
    ),
  'write-marketing': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteMarketingModal').then(
      (m) => ({ default: m.WriteMarketingModal })
    ),
  'write-real-estate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteRealEstateModal').then(
      (m) => ({ default: m.WriteRealEstateModal })
    ),
  'write-social': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/WriteSocialModal').then(
      (m) => ({ default: m.WriteSocialModal })
    ),
  'xml-to-csv': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/XmlToCsvModal').then(
      (m) => ({ default: m.XmlToCsvModal })
    ),
  'xml-to-excel': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/XmlToExcelModal').then(
      (m) => ({ default: m.XmlToExcelModal })
    ),
  'xml-to-json': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/XmlToJsonModal').then(
      (m) => ({ default: m.XmlToJsonModal })
    ),
  'youtube-thumbnails': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/images/YouTubeThumbnailsModal').then(
      (m) => ({ default: m.YouTubeThumbnailsModal })
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
