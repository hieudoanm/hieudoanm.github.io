import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

import { make as aiMake } from './ai';
import { make as casinoMake } from './casino';
import { make as chessMake } from './chess';
import { make as clocksMake } from './clocks';
import { make as converterMake } from './converter';
import { make as data_csvMake } from './data-csv';
import { make as data_excelMake } from './data-excel';
import { make as data_jsonMake } from './data-json';
import { make as data_xmlMake } from './data-xml';
import { make as data_utilityMake } from './data-utility';
import { make as developerMake } from './developer';
import { make as editorsMake } from './editors';
import { make as educationMake } from './education';
import { make as eyesMake } from './eyes';
import { make as financialMake } from './financial';
import { make as formatMake } from './format';
import { make as gamesMake } from './games';
import { make as image_convert_jpgMake } from './image-convert-jpg';
import { make as image_convert_pngMake } from './image-convert-png';
import { make as image_convert_webpMake } from './image-convert-webp';
import { make as image_convert_heicMake } from './image-convert-heic';
import { make as image_convert_gifMake } from './image-convert-gif';
import { make as image_convert_psdMake } from './image-convert-psd';
import { make as image_convert_tiffMake } from './image-convert-tiff';
import { make as image_convert_svgMake } from './image-convert-svg';
import { make as image_createMake } from './image-create';
import { make as image_editMake } from './image-edit';
import { make as image_effectMake } from './image-effect';
import { make as image_scanMake } from './image-scan';
import { make as memoryMake } from './memory';
import { make as pdf_convertMake } from './pdf-convert';
import { make as pdf_createMake } from './pdf-create';
import { make as pdf_ebookMake } from './pdf-ebook';
import { make as pdf_editMake } from './pdf-edit';
import { make as pdf_extractMake } from './pdf-extract';
import { make as pdf_miscMake } from './pdf-misc';
import { make as utilitiesMake } from './utilities';
import { make as video_audioMake } from './video-audio';
import { make as video_convert_aacMake } from './video-convert-aac';
import { make as video_convert_aviMake } from './video-convert-avi';
import { make as video_convert_flvMake } from './video-convert-flv';
import { make as video_convert_gifMake } from './video-convert-gif';
import { make as video_convert_m4aMake } from './video-convert-m4a';
import { make as video_convert_mkvMake } from './video-convert-mkv';
import { make as video_convert_movMake } from './video-convert-mov';
import { make as video_convert_mp4Make } from './video-convert-mp4';
import { make as video_convert_oggMake } from './video-convert-ogg';
import { make as video_convert_wmvMake } from './video-convert-wmv';
import { make as video_convert_webmMake } from './video-convert-webm';
import { make as video_downloadMake } from './video-download';
import { make as video_editMake } from './video-edit';
import { make as visualizationMake } from './visualization';
import { make as write_articleMake } from './write-article';
import { make as write_businessMake } from './write-business';
import { make as write_contentMake } from './write-content';
import { make as write_editMake } from './write-edit';
import { make as write_miscMake } from './write-misc';
import { make as write_real_estateMake } from './write-real-estate';
import { make as write_socialMake } from './write-social';

export const makeTools = (
  open: (id: ModalId) => () => void
): Record<string, Tool[]> => ({
  ai: aiMake(open),
  casino: casinoMake(open),
  chess: chessMake(open),
  clocks: clocksMake(open),
  converter: converterMake(open),
  'data-json': data_jsonMake(open),
  'data-xml': data_xmlMake(open),
  'data-csv': data_csvMake(open),
  'data-excel': data_excelMake(open),
  'data-utility': data_utilityMake(open),
  developer: developerMake(open),
  editors: editorsMake(open),
  education: educationMake(open),
  eyes: eyesMake(open),
  financial: financialMake(open),
  format: formatMake(open),
  games: gamesMake(open),
  'image-convert-jpg': image_convert_jpgMake(open),
  'image-convert-png': image_convert_pngMake(open),
  'image-convert-webp': image_convert_webpMake(open),
  'image-convert-heic': image_convert_heicMake(open),
  'image-convert-gif': image_convert_gifMake(open),
  'image-convert-psd': image_convert_psdMake(open),
  'image-convert-tiff': image_convert_tiffMake(open),
  'image-convert-svg': image_convert_svgMake(open),
  'image-create': image_createMake(open),
  'image-edit': image_editMake(open),
  'image-effect': image_effectMake(open),
  'image-scan': image_scanMake(open),
  memory: memoryMake(open),
  'pdf-convert': pdf_convertMake(open),
  'pdf-create': pdf_createMake(open),
  'pdf-ebook': pdf_ebookMake(open),
  'pdf-edit': pdf_editMake(open),
  'pdf-extract': pdf_extractMake(open),
  'pdf-misc': pdf_miscMake(open),
  utilities: utilitiesMake(open),
  'video-audio': video_audioMake(open),
  'video-convert-aac': video_convert_aacMake(open),
  'video-convert-avi': video_convert_aviMake(open),
  'video-convert-flv': video_convert_flvMake(open),
  'video-convert-gif': video_convert_gifMake(open),
  'video-convert-m4a': video_convert_m4aMake(open),
  'video-convert-mkv': video_convert_mkvMake(open),
  'video-convert-mov': video_convert_movMake(open),
  'video-convert-mp4': video_convert_mp4Make(open),
  'video-convert-ogg': video_convert_oggMake(open),
  'video-convert-wmv': video_convert_wmvMake(open),
  'video-convert-webm': video_convert_webmMake(open),
  'video-download': video_downloadMake(open),
  'video-edit': video_editMake(open),
  visualization: visualizationMake(open),
  'write-article': write_articleMake(open),
  'write-business': write_businessMake(open),
  'write-content': write_contentMake(open),
  'write-edit': write_editMake(open),
  'write-misc': write_miscMake(open),
  'write-real-estate': write_real_estateMake(open),
  'write-social': write_socialMake(open),
});
