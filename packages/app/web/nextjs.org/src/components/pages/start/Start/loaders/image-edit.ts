import { ComponentType, lazy } from 'react';

const loadimage_adjust = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageAdjustModal').then(
    (m) => ({ default: m.ImageAdjustModal })
  );
const loadimage_blur_background = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageBlurBackgroundModal').then(
    (m) => ({ default: m.ImageBlurBackgroundModal })
  );
const loadimage_border = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageBorderModal').then(
    (m) => ({ default: m.ImageBorderModal })
  );
const loadimage_bw = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageBwModal').then(
    (m) => ({ default: m.ImageBwModal })
  );
const loadimage_colorize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageColorizeModal').then(
    (m) => ({ default: m.ImageColorizeModal })
  );
const loadimage_combiner_side_by_side = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageCombinerSideBySideModal').then(
    (m) => ({ default: m.ImageCombinerSideBySideModal })
  );
const loadimage_combiner_stacked = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageCombinerStackedModal').then(
    (m) => ({ default: m.ImageCombinerStackedModal })
  );
const loadimage_compress = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageCompressModal').then(
    (m) => ({ default: m.ImageCompressModal })
  );
const loadimage_convert_gif_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertGifToJpgModal').then(
    (m) => ({ default: m.ImageConvertGifToJpgModal })
  );
const loadimage_convert_gif_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertGifToPngModal').then(
    (m) => ({ default: m.ImageConvertGifToPngModal })
  );
const loadimage_convert_heic_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertHeicToAvifModal').then(
    (m) => ({ default: m.ImageConvertHeicToAvifModal })
  );
const loadimage_convert_heic_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertHeicToJpgModal').then(
    (m) => ({ default: m.ImageConvertHeicToJpgModal })
  );
const loadimage_convert_heic_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertHeicToPngModal').then(
    (m) => ({ default: m.ImageConvertHeicToPngModal })
  );
const loadimage_convert_jpg_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertJpgToAvifModal').then(
    (m) => ({ default: m.ImageConvertJpgToAvifModal })
  );
const loadimage_convert_jpg_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertJpgToGifModal').then(
    (m) => ({ default: m.ImageConvertJpgToGifModal })
  );
const loadimage_convert_jpg_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertJpgToPngModal').then(
    (m) => ({ default: m.ImageConvertJpgToPngModal })
  );
const loadimage_convert_jpg_to_svg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertJpgToSvgModal').then(
    (m) => ({ default: m.ImageConvertJpgToSvgModal })
  );
const loadimage_convert_jpg_to_tiff = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertJpgToTiffModal').then(
    (m) => ({ default: m.ImageConvertJpgToTiffModal })
  );
const loadimage_convert_jpg_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertJpgToWebpModal').then(
    (m) => ({ default: m.ImageConvertJpgToWebpModal })
  );
const loadimage_convert_png_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertPngToAvifModal').then(
    (m) => ({ default: m.ImageConvertPngToAvifModal })
  );
const loadimage_convert_png_to_eps = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertPngToEpsModal').then(
    (m) => ({ default: m.ImageConvertPngToEpsModal })
  );
const loadimage_convert_png_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertPngToGifModal').then(
    (m) => ({ default: m.ImageConvertPngToGifModal })
  );
const loadimage_convert_png_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertPngToJpgModal').then(
    (m) => ({ default: m.ImageConvertPngToJpgModal })
  );
const loadimage_convert_png_to_svg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertPngToSvgModal').then(
    (m) => ({ default: m.ImageConvertPngToSvgModal })
  );
const loadimage_convert_png_to_tiff = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-advanced/ImageConvertPngToTiffModal').then(
    (m) => ({ default: m.ImageConvertPngToTiffModal })
  );
const loadimage_convert_png_to_webp = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertPngToWebpModal').then(
    (m) => ({ default: m.ImageConvertPngToWebpModal })
  );
const loadimage_convert_psd_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertPsdToJpgModal').then(
    (m) => ({ default: m.ImageConvertPsdToJpgModal })
  );
const loadimage_convert_psd_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertPsdToPngModal').then(
    (m) => ({ default: m.ImageConvertPsdToPngModal })
  );
const loadimage_convert_svg_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertSvgToPngModal').then(
    (m) => ({ default: m.ImageConvertSvgToPngModal })
  );
const loadimage_convert_tiff_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertTiffToJpgModal').then(
    (m) => ({ default: m.ImageConvertTiffToJpgModal })
  );
const loadimage_convert_tiff_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertTiffToPngModal').then(
    (m) => ({ default: m.ImageConvertTiffToPngModal })
  );
const loadimage_convert_webp_to_avif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertWebpToAvifModal').then(
    (m) => ({ default: m.ImageConvertWebpToAvifModal })
  );
const loadimage_convert_webp_to_gif = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-legacy/ImageConvertWebpToGifModal').then(
    (m) => ({ default: m.ImageConvertWebpToGifModal })
  );
const loadimage_convert_webp_to_jpg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertWebpToJpgModal').then(
    (m) => ({ default: m.ImageConvertWebpToJpgModal })
  );
const loadimage_convert_webp_to_png = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/convert-format/ImageConvertWebpToPngModal').then(
    (m) => ({ default: m.ImageConvertWebpToPngModal })
  );
const loadimage_crop = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageCropModal').then(
    (m) => ({ default: m.ImageCropModal })
  );
const loadimage_dominant_color = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/ImageDominantColorModal').then(
    (m) => ({ default: m.ImageDominantColorModal })
  );
const loadimage_flip = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageFlipModal').then(
    (m) => ({ default: m.ImageFlipModal })
  );
const loadimage_ocr = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/ImageOcrModal').then(
    (m) => ({ default: m.ImageOcrModal })
  );
const loadimage_photo_filters = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImagePhotoFiltersModal').then(
    (m) => ({ default: m.ImagePhotoFiltersModal })
  );
const loadimage_pixelate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImagePixelateModal').then(
    (m) => ({ default: m.ImagePixelateModal })
  );
const loadimage_pixelate_face = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImagePixelateFaceModal').then(
    (m) => ({ default: m.ImagePixelateFaceModal })
  );
const loadimage_profile = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/ImageProfileModal').then(
    (m) => ({ default: m.ImageProfileModal })
  );
const loadimage_resize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageResizeModal').then(
    (m) => ({ default: m.ImageResizeModal })
  );
const loadimage_rotate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageRotateModal').then(
    (m) => ({ default: m.ImageRotateModal })
  );
const loadimage_round = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageRoundModal').then(
    (m) => ({ default: m.ImageRoundModal })
  );
const loadimage_shadow = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageShadowModal').then(
    (m) => ({ default: m.ImageShadowModal })
  );
const loadimage_sharpen = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageSharpenModal').then(
    (m) => ({ default: m.ImageSharpenModal })
  );
const loadimage_split = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-edit/edit/ImageSplitModal').then(
    (m) => ({ default: m.ImageSplitModal })
  );
const loadimage_text = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageTextModal').then(
    (m) => ({ default: m.ImageTextModal })
  );
const loadimage_translate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-scan/ImageTranslateModal').then(
    (m) => ({ default: m.ImageTranslateModal })
  );
const loadimage_transparent_bg = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageTransparentBgModal').then(
    (m) => ({ default: m.ImageTransparentBgModal })
  );
const loadimage_vignette = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageVignetteModal').then(
    (m) => ({ default: m.ImageVignetteModal })
  );
const loadimage_watermark = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-effect/ImageWatermarkModal').then(
    (m) => ({ default: m.ImageWatermarkModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'image-adjust': loadimage_adjust,
  'image-blur-background': loadimage_blur_background,
  'image-border': loadimage_border,
  'image-bw': loadimage_bw,
  'image-colorize': loadimage_colorize,
  'image-combiner-side-by-side': loadimage_combiner_side_by_side,
  'image-combiner-stacked': loadimage_combiner_stacked,
  'image-compress': loadimage_compress,
  'image-convert-gif-to-jpg': loadimage_convert_gif_to_jpg,
  'image-convert-gif-to-png': loadimage_convert_gif_to_png,
  'image-convert-heic-to-avif': loadimage_convert_heic_to_avif,
  'image-convert-heic-to-jpg': loadimage_convert_heic_to_jpg,
  'image-convert-heic-to-png': loadimage_convert_heic_to_png,
  'image-convert-jpg-to-avif': loadimage_convert_jpg_to_avif,
  'image-convert-jpg-to-gif': loadimage_convert_jpg_to_gif,
  'image-convert-jpg-to-png': loadimage_convert_jpg_to_png,
  'image-convert-jpg-to-svg': loadimage_convert_jpg_to_svg,
  'image-convert-jpg-to-tiff': loadimage_convert_jpg_to_tiff,
  'image-convert-jpg-to-webp': loadimage_convert_jpg_to_webp,
  'image-convert-png-to-avif': loadimage_convert_png_to_avif,
  'image-convert-png-to-eps': loadimage_convert_png_to_eps,
  'image-convert-png-to-gif': loadimage_convert_png_to_gif,
  'image-convert-png-to-jpg': loadimage_convert_png_to_jpg,
  'image-convert-png-to-svg': loadimage_convert_png_to_svg,
  'image-convert-png-to-tiff': loadimage_convert_png_to_tiff,
  'image-convert-png-to-webp': loadimage_convert_png_to_webp,
  'image-convert-psd-to-jpg': loadimage_convert_psd_to_jpg,
  'image-convert-psd-to-png': loadimage_convert_psd_to_png,
  'image-convert-svg-to-png': loadimage_convert_svg_to_png,
  'image-convert-tiff-to-jpg': loadimage_convert_tiff_to_jpg,
  'image-convert-tiff-to-png': loadimage_convert_tiff_to_png,
  'image-convert-webp-to-avif': loadimage_convert_webp_to_avif,
  'image-convert-webp-to-gif': loadimage_convert_webp_to_gif,
  'image-convert-webp-to-jpg': loadimage_convert_webp_to_jpg,
  'image-convert-webp-to-png': loadimage_convert_webp_to_png,
  'image-crop': loadimage_crop,
  'image-dominant-color': loadimage_dominant_color,
  'image-flip': loadimage_flip,
  'image-ocr': loadimage_ocr,
  'image-photo-filters': loadimage_photo_filters,
  'image-pixelate': loadimage_pixelate,
  'image-pixelate-face': loadimage_pixelate_face,
  'image-profile': loadimage_profile,
  'image-resize': loadimage_resize,
  'image-rotate': loadimage_rotate,
  'image-round': loadimage_round,
  'image-shadow': loadimage_shadow,
  'image-sharpen': loadimage_sharpen,
  'image-split': loadimage_split,
  'image-text': loadimage_text,
  'image-translate': loadimage_translate,
  'image-transparent-bg': loadimage_transparent_bg,
  'image-vignette': loadimage_vignette,
  'image-watermark': loadimage_watermark,
};
