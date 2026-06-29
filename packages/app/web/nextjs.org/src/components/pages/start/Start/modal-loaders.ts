import { ComponentType, lazy } from 'react';

import { ModalId } from './types';

type ModalComponent = ComponentType<{ onClose: () => void }>;

const loaders: Record<string, () => Promise<{ default: ModalComponent }>> = {
  'ai-colorize': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/ai/AiColorizeModal').then(
      (m) => ({ default: m.AiColorizeModal })
    ),
  'ai-generate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/ai/AiGenerateModal').then(
      (m) => ({ default: m.AiGenerateModal })
    ),
  'ai-remove-bg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemoveBgModal').then(
      (m) => ({ default: m.AiRemoveBgModal })
    ),
  'ai-remove-object': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemoveObjectModal').then(
      (m) => ({ default: m.AiRemoveObjectModal })
    ),
  'ai-remove-person': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemovePersonModal').then(
      (m) => ({ default: m.AiRemovePersonModal })
    ),
  'ai-remove-watermark': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRemoveWatermarkModal').then(
      (m) => ({ default: m.AiRemoveWatermarkModal })
    ),
  'ai-restore': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/ai/AiRestoreModal').then(
      (m) => ({ default: m.AiRestoreModal })
    ),
  'ai-unblur': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/ai/AiUnblurModal').then(
      (m) => ({ default: m.AiUnblurModal })
    ),
  'ai-upscale': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/ai/AiUpscaleModal').then(
      (m) => ({ default: m.AiUpscaleModal })
    ),
  angle: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converter/AngleModal').then(
      (m) => ({ default: m.AngleModal })
    ),
  'audio-transcribe': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/audio/AudioTranscribeModal').then(
      (m) => ({ default: m.AudioTranscribeModal })
    ),
  'azw3-to-epub': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/ebook/AZW3ToEPUBModal').then(
      (m) => ({ default: m.AZW3ToEPUBModal })
    ),
  'azw3-to-mobi': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/ebook/AZW3ToMOBIModal').then(
      (m) => ({ default: m.AZW3ToMOBIModal })
    ),
  barcode: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-scan/BarcodeModal').then(
      (m) => ({ default: m.BarcodeModal })
    ),
  'barcode-read': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-scan/BarcodeReadModal').then(
      (m) => ({ default: m.BarcodeReadModal })
    ),
  base: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converter/BaseModal').then(
      (m) => ({ default: m.BaseModal })
    ),
  base64: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/Base64Modal').then(
      (m) => ({ default: m.Base64Modal })
    ),
  blackjack: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/BlackjackModal').then(
      (m) => ({ default: m.BlackjackModal })
    ),
  braille: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/format/BrailleModal').then(
      (m) => ({ default: m.BrailleModal })
    ),
  'breaking-bad': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/BreakingBadModal').then(
      (m) => ({ default: m.BreakingBadModal })
    ),
  calculator: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converter/CalculatorModal').then(
      (m) => ({ default: m.CalculatorModal })
    ),
  'calendar-tracker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker').then(
      (m) => ({ default: m.CalendarTrackerModal })
    ),
  camera: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/CameraModal').then(
      (m) => ({ default: m.CameraModal })
    ),
  'chart-maker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/ChartMakerModal').then(
      (m) => ({ default: m.ChartMakerModal })
    ),
  chat: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/ChatModal/ChatModal').then(
      (m) => ({ default: m.ChatModal })
    ),
  'chess-clock': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/ChessClockModal').then(
      (m) => ({ default: m.ChessClockModal })
    ),
  clipboard: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/ClipboardModal').then(
      (m) => ({ default: m.ClipboardModal })
    ),
  'collage-maker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/CollageMakerModal').then(
      (m) => ({ default: m.CollageMakerModal })
    ),
  colors: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/format/ColorsModal').then(
      (m) => ({ default: m.ColorsModal })
    ),
  'contrast-checker': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/ContrastCheckerModal').then(
      (m) => ({ default: m.ContrastCheckerModal })
    ),
  countdown: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CountdownModal').then(
      (m) => ({ default: m.CountdownModal })
    ),
  'create-md-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/CreateMdToPdfModal').then(
      (m) => ({ default: m.CreateMdToPdfModal })
    ),
  'create-text-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/CreateTextToPdfModal').then(
      (m) => ({ default: m.CreateTextToPdfModal })
    ),
  'create-url-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/CreateUrlToPdfModal').then(
      (m) => ({ default: m.CreateUrlToPdfModal })
    ),
  'create-zip': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/utility/CreateZipModal').then(
      (m) => ({ default: m.CreateZipModal })
    ),
  cron: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/CronModal').then(
      (m) => ({ default: m.CronModal })
    ),
  'csv-to-excel': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/csv/CsvToExcelModal').then(
      (m) => ({ default: m.CsvToExcelModal })
    ),
  'csv-to-json': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/csv/CsvToJsonModal').then(
      (m) => ({ default: m.CsvToJsonModal })
    ),
  'csv-to-xml': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/csv/CsvToXmlModal').then(
      (m) => ({ default: m.CsvToXmlModal })
    ),
  data: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converter/DataModal').then(
      (m) => ({ default: m.DataModal })
    ),
  'days-count': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/financial/DaysCountModal').then(
      (m) => ({ default: m.DaysCountModal })
    ),
  doi: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/academic/DOIModal').then(
      (m) => ({ default: m.DOIModal })
    ),
  elo: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/financial/EloModal').then(
      (m) => ({ default: m.EloModal })
    ),
  emojis: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/EmojisModal').then(
      (m) => ({ default: m.EmojisModal })
    ),
  english: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/education/languages/EnglishModal').then(
      (m) => ({ default: m.LanguagesEnglishModal })
    ),
  'epoch-convert': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/utility/EpochConvertModal').then(
      (m) => ({ default: m.EpochConvertModal })
    ),
  'epub-to-azw3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/ebook/EPUBToAZW3Modal').then(
      (m) => ({ default: m.EPUBToAZW3Modal })
    ),
  'epub-to-mobi': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/ebook/EPUBToMOBIModal').then(
      (m) => ({ default: m.EPUBToMOBIModal })
    ),
  'epub-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/EpubToPdfModal').then(
      (m) => ({ default: m.EpubToPdfModal })
    ),
  'excel-to-csv': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/csv/ExcelToCsvModal').then(
      (m) => ({ default: m.ExcelToCsvModal })
    ),
  'excel-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/excel/ExcelToPdfModal').then(
      (m) => ({ default: m.ExcelToPdfModal })
    ),
  'excel-to-xml': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/excel/ExcelToXmlModal').then(
      (m) => ({ default: m.ExcelToXmlModal })
    ),
  figlet: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/developer/FigletModal').then(
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
  'generate-subtitle': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/audio/GenerateSubtitleModal').then(
      (m) => ({ default: m.GenerateSubtitleModal })
    ),
  'github-social-preview': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/GitHubSocialPreviewModal').then(
      (m) => ({ default: m.GitHubSocialPreviewModal })
    ),
  'gradient-generator': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/GradientGeneratorModal').then(
      (m) => ({ default: m.GradientGeneratorModal })
    ),
  graph: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/GraphModal').then(
      (m) => ({ default: m.GraphModal })
    ),
  house: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/HouseModal').then(
      (m) => ({ default: m.HouseModal })
    ),
  'image-adjust': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageAdjustModal').then(
      (m) => ({ default: m.ImageAdjustModal })
    ),

  'image-blur-background': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageBlurBackgroundModal').then(
      (m) => ({ default: m.ImageBlurBackgroundModal })
    ),
  'image-border': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageBorderModal').then(
      (m) => ({ default: m.ImageBorderModal })
    ),
  'image-bw': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageBwModal').then(
      (m) => ({ default: m.ImageBwModal })
    ),
  'image-colorize': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageColorizeModal').then(
      (m) => ({ default: m.ImageColorizeModal })
    ),
  'image-combiner-side-by-side': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageCombinerSideBySideModal').then(
      (m) => ({ default: m.ImageCombinerSideBySideModal })
    ),
  'image-combiner-stacked': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageCombinerStackedModal').then(
      (m) => ({ default: m.ImageCombinerStackedModal })
    ),
  'image-compress': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageCompressModal').then(
      (m) => ({ default: m.ImageCompressModal })
    ),
  'image-convert-gif-to-jpg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertGifToJpgModal').then(
      (m) => ({ default: m.ImageConvertGifToJpgModal })
    ),
  'image-convert-gif-to-png': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertGifToPngModal').then(
      (m) => ({ default: m.ImageConvertGifToPngModal })
    ),
  'image-convert-heic-to-avif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertHeicToAvifModal').then(
      (m) => ({ default: m.ImageConvertHeicToAvifModal })
    ),
  'image-convert-heic-to-jpg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertHeicToJpgModal').then(
      (m) => ({ default: m.ImageConvertHeicToJpgModal })
    ),
  'image-convert-heic-to-png': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertHeicToPngModal').then(
      (m) => ({ default: m.ImageConvertHeicToPngModal })
    ),
  'image-convert-jpg-to-avif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertJpgToAvifModal').then(
      (m) => ({ default: m.ImageConvertJpgToAvifModal })
    ),
  'image-convert-jpg-to-gif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertJpgToGifModal').then(
      (m) => ({ default: m.ImageConvertJpgToGifModal })
    ),
  'image-convert-jpg-to-png': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertJpgToPngModal').then(
      (m) => ({ default: m.ImageConvertJpgToPngModal })
    ),
  'image-convert-jpg-to-svg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertJpgToSvgModal').then(
      (m) => ({ default: m.ImageConvertJpgToSvgModal })
    ),
  'image-convert-jpg-to-tiff': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertJpgToTiffModal').then(
      (m) => ({ default: m.ImageConvertJpgToTiffModal })
    ),
  'image-convert-jpg-to-webp': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertJpgToWebpModal').then(
      (m) => ({ default: m.ImageConvertJpgToWebpModal })
    ),
  'image-convert-png-to-avif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertPngToAvifModal').then(
      (m) => ({ default: m.ImageConvertPngToAvifModal })
    ),
  'image-convert-png-to-eps': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertPngToEpsModal').then(
      (m) => ({ default: m.ImageConvertPngToEpsModal })
    ),
  'image-convert-png-to-gif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertPngToGifModal').then(
      (m) => ({ default: m.ImageConvertPngToGifModal })
    ),
  'image-convert-png-to-jpg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertPngToJpgModal').then(
      (m) => ({ default: m.ImageConvertPngToJpgModal })
    ),
  'image-convert-png-to-svg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertPngToSvgModal').then(
      (m) => ({ default: m.ImageConvertPngToSvgModal })
    ),
  'image-convert-png-to-tiff': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertPngToTiffModal').then(
      (m) => ({ default: m.ImageConvertPngToTiffModal })
    ),
  'image-convert-png-to-webp': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertPngToWebpModal').then(
      (m) => ({ default: m.ImageConvertPngToWebpModal })
    ),
  'image-convert-psd-to-jpg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertPsdToJpgModal').then(
      (m) => ({ default: m.ImageConvertPsdToJpgModal })
    ),
  'image-convert-psd-to-png': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertPsdToPngModal').then(
      (m) => ({ default: m.ImageConvertPsdToPngModal })
    ),
  'image-convert-svg-to-png': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertSvgToPngModal').then(
      (m) => ({ default: m.ImageConvertSvgToPngModal })
    ),
  'image-convert-tiff-to-jpg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertTiffToJpgModal').then(
      (m) => ({ default: m.ImageConvertTiffToJpgModal })
    ),
  'image-convert-tiff-to-png': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertTiffToPngModal').then(
      (m) => ({ default: m.ImageConvertTiffToPngModal })
    ),
  'image-convert-webp-to-avif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertWebpToAvifModal').then(
      (m) => ({ default: m.ImageConvertWebpToAvifModal })
    ),
  'image-convert-webp-to-gif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertWebpToGifModal').then(
      (m) => ({ default: m.ImageConvertWebpToGifModal })
    ),
  'image-convert-webp-to-jpg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertWebpToJpgModal').then(
      (m) => ({ default: m.ImageConvertWebpToJpgModal })
    ),
  'image-convert-webp-to-png': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertWebpToPngModal').then(
      (m) => ({ default: m.ImageConvertWebpToPngModal })
    ),

  'image-crop': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageCropModal').then(
      (m) => ({ default: m.ImageCropModal })
    ),
  'image-dominant-color': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-scan/ImageDominantColorModal').then(
      (m) => ({ default: m.ImageDominantColorModal })
    ),

  'image-flip': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageFlipModal').then(
      (m) => ({ default: m.ImageFlipModal })
    ),
  'image-ocr': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-scan/ImageOcrModal').then(
      (m) => ({ default: m.ImageOcrModal })
    ),
  'image-photo-filters': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImagePhotoFiltersModal').then(
      (m) => ({ default: m.ImagePhotoFiltersModal })
    ),
  'image-pixelate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImagePixelateModal').then(
      (m) => ({ default: m.ImagePixelateModal })
    ),
  'image-pixelate-face': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImagePixelateFaceModal').then(
      (m) => ({ default: m.ImagePixelateFaceModal })
    ),
  'image-profile': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/ImageProfileModal').then(
      (m) => ({ default: m.ImageProfileModal })
    ),
  'image-resize': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageResizeModal').then(
      (m) => ({ default: m.ImageResizeModal })
    ),
  'image-rotate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageRotateModal').then(
      (m) => ({ default: m.ImageRotateModal })
    ),
  'image-round': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageRoundModal').then(
      (m) => ({ default: m.ImageRoundModal })
    ),
  'image-shadow': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageShadowModal').then(
      (m) => ({ default: m.ImageShadowModal })
    ),
  'image-sharpen': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageSharpenModal').then(
      (m) => ({ default: m.ImageSharpenModal })
    ),
  'image-split': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageSplitModal').then(
      (m) => ({ default: m.ImageSplitModal })
    ),
  'image-text': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageTextModal').then(
      (m) => ({ default: m.ImageTextModal })
    ),
  'image-translate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-scan/ImageTranslateModal').then(
      (m) => ({ default: m.ImageTranslateModal })
    ),
  'image-transparent-bg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageTransparentBgModal').then(
      (m) => ({ default: m.ImageTransparentBgModal })
    ),
  'image-vignette': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageVignetteModal').then(
      (m) => ({ default: m.ImageVignetteModal })
    ),
  'image-watermark': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageWatermarkModal').then(
      (m) => ({ default: m.ImageWatermarkModal })
    ),
  'images-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/ImagesToPdfModal').then(
      (m) => ({ default: m.ImagesToPdfModal })
    ),
  inflation: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/financial/InflationModal').then(
      (m) => ({ default: m.InflationModal })
    ),
  instasize: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/InstaSizeModal').then(
      (m) => ({ default: m.InstaSizeModal })
    ),
  'invoice-parser': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-scan/InvoiceParserModal').then(
      (m) => ({ default: m.InvoiceParserModal })
    ),
  ip: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/developer/IPModal').then(
      (m) => ({ default: m.IPModal })
    ),
  'json-schema': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/JSONSchemaModal').then(
      (m) => ({ default: m.JSONSchemaModal })
    ),
  'json-to-csv': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/JsonToCsvModal').then(
      (m) => ({ default: m.JsonToCsvModal })
    ),
  'json-to-xml': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/JsonToXmlModal').then(
      (m) => ({ default: m.JsonToXmlModal })
    ),
  kaprekar: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/KaprekarModal').then(
      (m) => ({ default: m.KaprekarModal })
    ),
  legislation: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/LegislationModal').then(
      (m) => ({ default: m.LegislationModal })
    ),
  leetspeak: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/format/LeetSpeakModal').then(
      (m) => ({ default: m.LeetSpeakModal })
    ),
  length: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converter/LengthModal').then(
      (m) => ({ default: m.LengthModal })
    ),
  logmar: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/LogMARChartModal').then(
      (m) => ({ default: m.LogMARChartModal })
    ),
  'lorem-ipsum': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/format/LoremIpsumModal').then(
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
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/MemeMakerModal').then(
      (m) => ({ default: m.MemeMakerModal })
    ),
  'mobi-to-azw3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/ebook/MOBIToAZW3Modal').then(
      (m) => ({ default: m.MOBIToAZW3Modal })
    ),
  'mobi-to-epub': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/ebook/MOBIToEPUBModal').then(
      (m) => ({ default: m.MOBIToEPUBModal })
    ),
  morse: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/format/MorseModal').then(
      (m) => ({ default: m.MorseModal })
    ),
  'no-sleep': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/NoSleepModal').then(
      (m) => ({ default: m.NoSleepModal })
    ),
  openapi: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/format/OpenAPI2Postman').then(
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
  'pdf-annotate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfAnnotateModal').then(
      (m) => ({ default: m.PdfAnnotateModal })
    ),
  'pdf-compress': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfCompressModal').then(
      (m) => ({ default: m.PdfCompressModal })
    ),
  'pdf-crop': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfCropModal').then(
      (m) => ({ default: m.PdfCropModal })
    ),
  'pdf-delete-pages': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfDeletePagesModal').then(
      (m) => ({ default: m.PdfDeletePagesModal })
    ),
  'pdf-esign': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/esign/PdfEsignModal').then(
      (m) => ({ default: m.PdfEsignModal })
    ),
  'pdf-extract-images': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfExtractImagesModal').then(
      (m) => ({ default: m.PdfExtractImagesModal })
    ),
  'pdf-extract-text': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfExtractTextModal').then(
      (m) => ({ default: m.PdfExtractTextModal })
    ),
  'pdf-info': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfInfoModal').then(
      (m) => ({ default: m.PdfInfoModal })
    ),
  'pdf-merge': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfMergeModal').then(
      (m) => ({ default: m.PdfMergeModal })
    ),
  'pdf-metadata': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfMetadataModal').then(
      (m) => ({ default: m.PdfMetadataModal })
    ),
  'pdf-ocr': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfOcrModal').then(
      (m) => ({ default: m.PdfOcrModal })
    ),
  'pdf-page-numbers': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfPageNumbersModal').then(
      (m) => ({ default: m.PdfPageNumbersModal })
    ),
  'pdf-rearrange': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfRearrangeModal').then(
      (m) => ({ default: m.PdfRearrangeModal })
    ),
  'pdf-redact': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfRedactModal').then(
      (m) => ({ default: m.PdfRedactModal })
    ),
  'pdf-repair': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/extract/PdfRepairModal').then(
      (m) => ({ default: m.PdfRepairModal })
    ),
  'pdf-rotate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfRotateModal').then(
      (m) => ({ default: m.PdfRotateModal })
    ),
  'pdf-security': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/PdfSecurityModal').then(
      (m) => ({ default: m.PdfSecurityModal })
    ),
  'pdf-split': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfSplitModal').then(
      (m) => ({ default: m.PdfSplitModal })
    ),
  'pdf-to-epub': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToEpubModal').then(
      (m) => ({ default: m.PdfToEpubModal })
    ),
  'pdf-to-excel': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToExcelModal').then(
      (m) => ({ default: m.PdfToExcelModal })
    ),
  'pdf-to-images': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToImagesModal').then(
      (m) => ({ default: m.PdfToImagesModal })
    ),
  'pdf-to-ppt': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToPptModal').then(
      (m) => ({ default: m.PdfToPptModal })
    ),
  'pdf-to-word': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/to-doc/PdfToWordModal').then(
      (m) => ({ default: m.PdfToWordModal })
    ),
  'pdf-watermark': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/edit/PdfWatermarkModal').then(
      (m) => ({ default: m.PdfWatermarkModal })
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
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/PixelModal').then(
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
  'ppt-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/PptToPdfModal').then(
      (m) => ({ default: m.PptToPdfModal })
    ),
  proxy: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/developer/ProxyModal').then(
      (m) => ({ default: m.ProxyModal })
    ),
  qr: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-scan/QRCodeModal').then(
      (m) => ({ default: m.QRCodeModal })
    ),
  'qr-read': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-scan/QrReadModal').then(
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
    import('@hieudoanm.github.io/components/pages/start/modals/converter/RomanModal').then(
      (m) => ({ default: m.RomanModal })
    ),
  rps: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/RockPaperScissorsModal').then(
      (m) => ({ default: m.RockPaperScissorsModal })
    ),
  'screen-recorder': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/ScreenRecorderModal').then(
      (m) => ({ default: m.ScreenRecorderModal })
    ),
  sheets: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/developer/SheetsModal').then(
      (m) => ({ default: m.SheetsModal })
    ),
  'shopify-detect': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/developer/ShopifyDetectModal').then(
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
    import('@hieudoanm.github.io/components/pages/start/modals/financial/SplitBillModal').then(
      (m) => ({ default: m.SplitBillModal })
    ),
  'split-csv': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/csv/SplitCsvModal').then(
      (m) => ({ default: m.SplitCsvModal })
    ),
  'split-excel': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/excel/SplitExcelModal').then(
      (m) => ({ default: m.SplitExcelModal })
    ),
  sudoku: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/SudokuModal').then(
      (m) => ({ default: m.SudokuModal })
    ),
  svg: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/developer/SVGModal').then(
      (m) => ({ default: m.SVGModal })
    ),
  t3: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/T3Modal').then(
      (m) => ({ default: m.T3Modal })
    ),
  tax: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/financial/TaxModal').then(
      (m) => ({ default: m.TaxModal })
    ),
  temperature: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converter/TemperatureModal').then(
      (m) => ({ default: m.TemperatureModal })
    ),
  'text-case': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/developer/TextCaseModal').then(
      (m) => ({ default: m.TextCaseModal })
    ),
  'text-diff': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/developer/TextDiffModal').then(
      (m) => ({ default: m.TextDiffModal })
    ),
  'text-password': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/TextPasswordModal').then(
      (m) => ({ default: m.TextPasswordModal })
    ),

  'text-url-tracer': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/developer/TextUrlTracerModal').then(
      (m) => ({ default: m.TextUrlTracerModal })
    ),
  'text-word-count': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/utilities/TextWordCountModal').then(
      (m) => ({ default: m.TextWordCountModal })
    ),
  time: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converter/TimeModal').then(
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
    import('@hieudoanm.github.io/components/pages/start/modals/developer/UUIDModal').then(
      (m) => ({ default: m.UUIDModal })
    ),
  'url-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/UrlToPdfModal').then(
      (m) => ({ default: m.UrlToPdfModal })
    ),
  'video-aac-to-mp3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoAacToMp3Modal').then(
      (m) => ({ default: m.VideoAacToMp3Modal })
    ),
  'video-aac-to-mp4': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoAacToMp4Modal').then(
      (m) => ({ default: m.VideoAacToMp4Modal })
    ),
  'video-aac-to-wav': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoAacToWavModal').then(
      (m) => ({ default: m.VideoAacToWavModal })
    ),
  'video-avi-to-gif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoAviToGifModal').then(
      (m) => ({ default: m.VideoAviToGifModal })
    ),
  'video-avi-to-mp3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoAviToMp3Modal').then(
      (m) => ({ default: m.VideoAviToMp3Modal })
    ),
  'video-avi-to-mp4': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoAviToMp4Modal').then(
      (m) => ({ default: m.VideoAviToMp4Modal })
    ),
  'video-compress': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoCompressModal').then(
      (m) => ({ default: m.VideoCompressModal })
    ),
  'video-convert-to-webm': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoConvertToWebmModal').then(
      (m) => ({ default: m.VideoConvertToWebmModal })
    ),
  'video-crop': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoCropModal').then(
      (m) => ({ default: m.VideoCropModal })
    ),
  'video-download-facebook': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoFacebookModal').then(
      (m) => ({ default: m.VideoFacebookModal })
    ),
  'video-download-instagram': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoInstagramModal').then(
      (m) => ({ default: m.VideoInstagramModal })
    ),
  'video-download-tiktok': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoTikTokModal').then(
      (m) => ({ default: m.VideoTikTokModal })
    ),
  'video-download-twitter': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoTwitterModal').then(
      (m) => ({ default: m.VideoTwitterModal })
    ),
  'video-extract-audio': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoExtractAudioModal').then(
      (m) => ({ default: m.VideoExtractAudioModal })
    ),
  'video-extract-frames': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoExtractFramesModal').then(
      (m) => ({ default: m.VideoExtractFramesModal })
    ),
  'video-flv-to-mp4': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoFlvToMp4Modal').then(
      (m) => ({ default: m.VideoFlvToMp4Modal })
    ),
  'video-gif-to-mov': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoGifToMovModal').then(
      (m) => ({ default: m.VideoGifToMovModal })
    ),
  'video-gif-to-mp4': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoGifToMp4Modal').then(
      (m) => ({ default: m.VideoGifToMp4Modal })
    ),
  'video-gif-to-webm': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoGifToWebmModal').then(
      (m) => ({ default: m.VideoGifToWebmModal })
    ),
  'video-m4a-to-mp3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoM4aToMp3Modal').then(
      (m) => ({ default: m.VideoM4aToMp3Modal })
    ),
  'video-m4a-to-mp4': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoM4aToMp4Modal').then(
      (m) => ({ default: m.VideoM4aToMp4Modal })
    ),
  'video-m4a-to-wav': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoM4aToWavModal').then(
      (m) => ({ default: m.VideoM4aToWavModal })
    ),
  'video-merge': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoMergeModal').then(
      (m) => ({ default: m.VideoMergeModal })
    ),
  'video-mkv-to-gif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMkvToGifModal').then(
      (m) => ({ default: m.VideoMkvToGifModal })
    ),
  'video-mkv-to-mp3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMkvToMp3Modal').then(
      (m) => ({ default: m.VideoMkvToMp3Modal })
    ),
  'video-mkv-to-mp4': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoMkvToMp4Modal').then(
      (m) => ({ default: m.VideoMkvToMp4Modal })
    ),
  'video-mov-to-avi': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMovToAviModal').then(
      (m) => ({ default: m.VideoMovToAviModal })
    ),
  'video-mov-to-gif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMovToGifModal').then(
      (m) => ({ default: m.VideoMovToGifModal })
    ),
  'video-mov-to-mp3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMovToMp3Modal').then(
      (m) => ({ default: m.VideoMovToMp3Modal })
    ),
  'video-mov-to-mp4': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoMovToMp4Modal').then(
      (m) => ({ default: m.VideoMovToMp4Modal })
    ),
  'video-mov-to-wav': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMovToWavModal').then(
      (m) => ({ default: m.VideoMovToWavModal })
    ),
  'video-mp4-to-avi': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoMp4ToAviModal').then(
      (m) => ({ default: m.VideoMp4ToAviModal })
    ),
  'video-mp4-to-mov': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoMp4ToMovModal').then(
      (m) => ({ default: m.VideoMp4ToMovModal })
    ),
  'video-mp4-to-mp3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMp4ToMp3Modal').then(
      (m) => ({ default: m.VideoMp4ToMp3Modal })
    ),
  'video-mp4-to-ogg': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoMp4ToOggModal').then(
      (m) => ({ default: m.VideoMp4ToOggModal })
    ),
  'video-mp4-to-wav': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoMp4ToWavModal').then(
      (m) => ({ default: m.VideoMp4ToWavModal })
    ),
  'video-mute': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoMuteModal').then(
      (m) => ({ default: m.VideoMuteModal })
    ),
  'video-ogg-to-mp3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoOggToMp3Modal').then(
      (m) => ({ default: m.VideoOggToMp3Modal })
    ),
  'video-ogg-to-wav': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-audio/VideoOggToWavModal').then(
      (m) => ({ default: m.VideoOggToWavModal })
    ),
  'video-resize': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoResizeModal').then(
      (m) => ({ default: m.VideoResizeModal })
    ),
  'video-speed': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoSpeedModal').then(
      (m) => ({ default: m.VideoSpeedModal })
    ),
  'video-stabilize': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoStabilizeModal').then(
      (m) => ({ default: m.VideoStabilizeModal })
    ),
  'video-to-gif': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoToGifModal').then(
      (m) => ({ default: m.VideoToGifModal })
    ),
  'video-to-webp': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoToWebpModal').then(
      (m) => ({ default: m.VideoToWebpModal })
    ),
  'video-trim': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/edit/VideoTrimModal').then(
      (m) => ({ default: m.VideoTrimModal })
    ),
  'video-webm-to-mp3': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert-misc/VideoWebmToMp3Modal').then(
      (m) => ({ default: m.VideoWebmToMp3Modal })
    ),
  'video-wmv-to-mp4': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/convert/VideoWmvToMp4Modal').then(
      (m) => ({ default: m.VideoWmvToMp4Modal })
    ),
  'video-youtube-text': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoYoutubeTextModal').then(
      (m) => ({ default: m.VideoYoutubeTextModal })
    ),
  'video-youtube-transcript': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/video/download/VideoYoutubeTranscriptModal').then(
      (m) => ({ default: m.VideoYoutubeTranscriptModal })
    ),
  watchface: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/clocks/WatchfaceModal').then(
      (m) => ({ default: m.WatchFaceModal })
    ),
  weight: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converter/WeightModal').then(
      (m) => ({ default: m.WeightModal })
    ),
  'word-counter': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/utility/WordCounterModal').then(
      (m) => ({ default: m.WordCounterModal })
    ),
  'word-to-pdf': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/pdf/from-doc/WordToPdfModal').then(
      (m) => ({ default: m.WordToPdfModal })
    ),
  wordle: () =>
    import('@hieudoanm.github.io/components/pages/start/modals/games/WordleModal').then(
      (m) => ({ default: m.WordleModal })
    ),
  'write-ai-detector': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteAiDetectorModal').then(
      (m) => ({ default: m.WriteAiDetectorModal })
    ),
  'write-article': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteArticleModal').then(
      (m) => ({ default: m.WriteArticleModal })
    ),
  'write-article-rewriter': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteArticleRewriterModal').then(
      (m) => ({ default: m.WriteArticleRewriterModal })
    ),
  'write-bill-of-sale': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteBillOfSaleModal').then(
      (m) => ({ default: m.WriteBillOfSaleModal })
    ),
  'write-blog-ideas': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteBlogIdeasModal').then(
      (m) => ({ default: m.WriteBlogIdeasModal })
    ),
  'write-blog-outline': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteBlogOutlineModal').then(
      (m) => ({ default: m.WriteBlogOutlineModal })
    ),
  'write-blog-post': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteBlogPostModal').then(
      (m) => ({ default: m.WriteBlogPostModal })
    ),
  'write-business-name': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteBusinessNameModal').then(
      (m) => ({ default: m.WriteBusinessNameModal })
    ),
  'write-business-plan': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteBusinessPlanModal').then(
      (m) => ({ default: m.WriteBusinessPlanModal })
    ),
  'write-business-slogan': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteBusinessSloganModal').then(
      (m) => ({ default: m.WriteBusinessSloganModal })
    ),
  'write-caption': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteCaptionModal').then(
      (m) => ({ default: m.WriteCaptionModal })
    ),
  'write-cold-email': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteColdEmailModal').then(
      (m) => ({ default: m.WriteColdEmailModal })
    ),
  'write-complete': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteCompleteModal').then(
      (m) => ({ default: m.WriteCompleteModal })
    ),
  'write-content-brief': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/content/WriteContentBriefModal').then(
      (m) => ({ default: m.WriteContentBriefModal })
    ),
  'write-content-planner': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/content/WriteContentPlannerModal').then(
      (m) => ({ default: m.WriteContentPlannerModal })
    ),
  'write-essay': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteEssayModal').then(
      (m) => ({ default: m.WriteEssayModal })
    ),
  'write-explain': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteExplainModal').then(
      (m) => ({ default: m.WriteExplainModal })
    ),
  'write-faq': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/content/WriteFaqModal').then(
      (m) => ({ default: m.WriteFaqModal })
    ),
  'write-grammar': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteGrammarModal').then(
      (m) => ({ default: m.WriteGrammarModal })
    ),
  'write-headline': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteHeadlineModal').then(
      (m) => ({ default: m.WriteHeadlineModal })
    ),
  'write-humanizer': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteHumanizerModal').then(
      (m) => ({ default: m.WriteHumanizerModal })
    ),
  'write-improve-text': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteImproveTextModal').then(
      (m) => ({ default: m.WriteImproveTextModal })
    ),
  'write-landing-page': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteLandingPageModal').then(
      (m) => ({ default: m.WriteLandingPageModal })
    ),
  'write-linkedin-post': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteLinkedInPostModal').then(
      (m) => ({ default: m.WriteLinkedInPostModal })
    ),
  'write-listicle': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteListicleModal').then(
      (m) => ({ default: m.WriteListicleModal })
    ),
  'write-meta-description': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteMetaDescriptionModal').then(
      (m) => ({ default: m.WriteMetaDescriptionModal })
    ),
  'write-nda': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteNdaModal').then(
      (m) => ({ default: m.WriteNdaModal })
    ),
  'write-paragraph': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteParagraphModal').then(
      (m) => ({ default: m.WriteParagraphModal })
    ),
  'write-paraphrase': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteParaphraseModal').then(
      (m) => ({ default: m.WriteParaphraseModal })
    ),
  'write-podcast-script': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WritePodcastScriptModal').then(
      (m) => ({ default: m.WritePodcastScriptModal })
    ),
  'write-poll': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/content/WritePollModal').then(
      (m) => ({ default: m.WritePollModal })
    ),
  'write-press-release': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WritePressReleaseModal').then(
      (m) => ({ default: m.WritePressReleaseModal })
    ),
  'write-privacy-policy': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WritePrivacyPolicyModal').then(
      (m) => ({ default: m.WritePrivacyPolicyModal })
    ),
  'write-purchase-agreement': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/business/WritePurchaseAgreementModal').then(
      (m) => ({ default: m.WritePurchaseAgreementModal })
    ),
  'write-real-estate-bio': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/real-estate/WriteRealEstateBioModal').then(
      (m) => ({ default: m.WriteRealEstateBioModal })
    ),
  'write-real-estate-description': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/real-estate/WriteRealEstateDescriptionModal').then(
      (m) => ({ default: m.WriteRealEstateDescriptionModal })
    ),
  'write-real-estate-listing': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/real-estate/WriteRealEstateListingModal').then(
      (m) => ({ default: m.WriteRealEstateListingModal })
    ),
  'write-rewrite': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteRewriteModal').then(
      (m) => ({ default: m.WriteRewriteModal })
    ),
  'write-shorten': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteShortenModal').then(
      (m) => ({ default: m.WriteShortenModal })
    ),
  'write-story': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteStoryModal').then(
      (m) => ({ default: m.WriteStoryModal })
    ),
  'write-story-ideas': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteStoryIdeasModal').then(
      (m) => ({ default: m.WriteStoryIdeasModal })
    ),
  'write-summarize': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteSummarizeModal').then(
      (m) => ({ default: m.WriteSummarizeModal })
    ),
  'write-summarize-podcast': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteSummarizePodcastModal').then(
      (m) => ({ default: m.WriteSummarizePodcastModal })
    ),
  'write-summarize-youtube': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteSummarizeYoutubeModal').then(
      (m) => ({ default: m.WriteSummarizeYoutubeModal })
    ),
  'write-tiktok-script': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteTikTokScriptModal').then(
      (m) => ({ default: m.WriteTikTokScriptModal })
    ),
  'write-title': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteTitleModal').then(
      (m) => ({ default: m.WriteTitleModal })
    ),
  'write-tone': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteToneModal').then(
      (m) => ({ default: m.WriteToneModal })
    ),
  'write-translate': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteTranslateModal').then(
      (m) => ({ default: m.WriteTranslateModal })
    ),
  'write-trivia': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/content/WriteTriviaModal').then(
      (m) => ({ default: m.WriteTriviaModal })
    ),
  'write-twitter-generator': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteTwitterGeneratorModal').then(
      (m) => ({ default: m.WriteTwitterGeneratorModal })
    ),
  'write-youtube-script': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteYoutubeScriptModal').then(
      (m) => ({ default: m.WriteYoutubeScriptModal })
    ),
  'xml-to-csv': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/XmlToCsvModal').then(
      (m) => ({ default: m.XmlToCsvModal })
    ),
  'xml-to-excel': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/XmlToExcelModal').then(
      (m) => ({ default: m.XmlToExcelModal })
    ),
  'xml-to-json': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/XmlToJsonModal').then(
      (m) => ({ default: m.XmlToJsonModal })
    ),
  'youtube-thumbnails': () =>
    import('@hieudoanm.github.io/components/pages/start/modals/image-create/YouTubeThumbnailsModal').then(
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
