import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

import { make as aiMake } from './ai';
import { make as casinoMake } from './casino';
import { make as clocksMake } from './clocks';
import { make as converterMake } from './converter';
import { make as data_csvMake } from './data-csv';
import { make as data_excelMake } from './data-excel';
import { make as data_utilityMake } from './data-utility';
import { make as data_xml_jsonMake } from './data-xml-json';
import { make as developerMake } from './developer';
import { make as editorsMake } from './editors';
import { make as educationMake } from './education';
import { make as eyesMake } from './eyes';
import { make as financialMake } from './financial';
import { make as formatMake } from './format';
import { make as gamesMake } from './games';
import { make as image_convertMake } from './image-convert';
import { make as image_convert_plusMake } from './image-convert-plus';
import { make as image_convert_proMake } from './image-convert-pro';
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
import { make as video_convertMake } from './video-convert';
import { make as video_convert_audioMake } from './video-convert-audio';
import { make as video_convert_miscMake } from './video-convert-misc';
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
  clocks: clocksMake(open),
  converter: converterMake(open),
  'data-csv': data_csvMake(open),
  'data-excel': data_excelMake(open),
  'data-utility': data_utilityMake(open),
  'data-xml-json': data_xml_jsonMake(open),
  developer: developerMake(open),
  editors: editorsMake(open),
  education: educationMake(open),
  eyes: eyesMake(open),
  financial: financialMake(open),
  format: formatMake(open),
  games: gamesMake(open),
  'image-convert': image_convertMake(open),
  'image-convert-plus': image_convert_plusMake(open),
  'image-convert-pro': image_convert_proMake(open),
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
  'video-convert': video_convertMake(open),
  'video-convert-audio': video_convert_audioMake(open),
  'video-convert-misc': video_convert_miscMake(open),
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
