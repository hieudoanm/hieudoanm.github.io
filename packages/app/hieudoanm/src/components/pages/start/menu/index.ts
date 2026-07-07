import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

import { make as calculatorFinanceMake } from './calculator-finance';
import { make as clocksMake } from './clocks';
import { make as dataCsvMake } from './data-csv';
import { make as dataExcelMake } from './data-excel';
import { make as dataJsonMake } from './data-json';
import { make as dataXmlMake } from './data-xml';
import { make as developerMake } from './developer';
import { make as editorsMake } from './editors';
import { make as educationMake } from './education';
import { make as gamesArcadeMake } from './games-arcade';
import { make as gamesCasinoMake } from './games-casino';
import { make as gamesChessMake } from './games-chess';
import { make as gamesMemoryMake } from './games-memory';
import { make as gamesPuzzleMake } from './games-puzzle';
import { make as gamesTriviaMake } from './games-trivia';
import { make as gamesWordMake } from './games-word';
import { make as healthVisionMake } from './health-vision';
import { make as imageAiMake } from './image-ai';
import { make as imageColorMake } from './image-color';
import { make as imageConvertGifMake } from './image-convert-gif';
import { make as imageConvertHeicMake } from './image-convert-heic';
import { make as imageConvertJpgMake } from './image-convert-jpg';
import { make as imageConvertPngMake } from './image-convert-png';
import { make as imageConvertPsdMake } from './image-convert-psd';
import { make as imageConvertSvgMake } from './image-convert-svg';
import { make as imageConvertTiffMake } from './image-convert-tiff';
import { make as imageConvertWebpMake } from './image-convert-webp';
import { make as imageCreateMake } from './image-create';
import { make as imageEditMake } from './image-edit';
import { make as imageEffectMake } from './image-effect';
import { make as imageScanMake } from './image-scan';
import { make as markdownMake } from './markdown';
import { make as pdfConvertMake } from './pdf-convert';
import { make as pdfCreateMake } from './pdf-create';
import { make as pdfEbookMake } from './pdf-ebook';
import { make as pdfEditMake } from './pdf-edit';
import { make as pdfExtractMake } from './pdf-extract';
import { make as pdfMiscMake } from './pdf-misc';
import { make as textConvertMake } from './text-convert';
import { make as utilitiesMake } from './utilities';
import { make as videoMake } from './video';
import { make as visualizationMake } from './visualization';
import { make as writeMake } from './write';

export const makeTools = (
  open: (id: ModalId) => () => void
): Record<string, Tool[]> => ({
  'calculator-finance': calculatorFinanceMake(open),
  clocks: clocksMake(open),
  'data-csv': dataCsvMake(open),
  'data-excel': dataExcelMake(open),
  'data-json': dataJsonMake(open),
  'data-xml': dataXmlMake(open),
  developer: developerMake(open),
  editors: editorsMake(open),
  education: educationMake(open),
  'games-arcade': gamesArcadeMake(open),
  'games-casino': gamesCasinoMake(open),
  'games-chess': gamesChessMake(open),
  'games-memory': gamesMemoryMake(open),
  'games-puzzle': gamesPuzzleMake(open),
  'games-trivia': gamesTriviaMake(open),
  'games-word': gamesWordMake(open),
  'health-vision': healthVisionMake(open),
  'image-ai': imageAiMake(open),
  'image-color': imageColorMake(open),
  'image-convert-gif': imageConvertGifMake(open),
  'image-convert-heic': imageConvertHeicMake(open),
  'image-convert-jpg': imageConvertJpgMake(open),
  'image-convert-png': imageConvertPngMake(open),
  'image-convert-psd': imageConvertPsdMake(open),
  'image-convert-svg': imageConvertSvgMake(open),
  'image-convert-tiff': imageConvertTiffMake(open),
  'image-convert-webp': imageConvertWebpMake(open),
  'image-create': imageCreateMake(open),
  'image-edit': imageEditMake(open),
  'image-effect': imageEffectMake(open),
  'image-scan': imageScanMake(open),
  markdown: markdownMake(open),
  'pdf-convert': pdfConvertMake(open),
  'pdf-create': pdfCreateMake(open),
  'pdf-ebook': pdfEbookMake(open),
  'pdf-edit': pdfEditMake(open),
  'pdf-extract': pdfExtractMake(open),
  'pdf-misc': pdfMiscMake(open),
  'text-convert': textConvertMake(open),
  utilities: utilitiesMake(open),
  video: videoMake(open),
  visualization: visualizationMake(open),
  write: writeMake(open),
});
