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
import { make as videoAudioMake } from './video-audio';
import { make as videoConvertAacMake } from './video-convert-aac';
import { make as videoConvertAviMake } from './video-convert-avi';
import { make as videoConvertFlvMake } from './video-convert-flv';
import { make as videoConvertGifMake } from './video-convert-gif';
import { make as videoConvertM4aMake } from './video-convert-m4a';
import { make as videoConvertMkvMake } from './video-convert-mkv';
import { make as videoConvertMovMake } from './video-convert-mov';
import { make as videoConvertMp4Make } from './video-convert-mp4';
import { make as videoConvertOggMake } from './video-convert-ogg';
import { make as videoConvertWebmMake } from './video-convert-webm';
import { make as videoConvertWmvMake } from './video-convert-wmv';
import { make as videoDownloadMake } from './video-download';
import { make as videoEditMake } from './video-edit';
import { make as visualizationMake } from './visualization';
import { make as writeArticleMake } from './write-article';
import { make as writeBusinessMake } from './write-business';
import { make as writeContentMake } from './write-content';
import { make as writeEditMake } from './write-edit';
import { make as writeMiscMake } from './write-misc';
import { make as writeRealEstateMake } from './write-real-estate';
import { make as writeSocialMake } from './write-social';

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
  'video-audio': videoAudioMake(open),
  'video-convert-aac': videoConvertAacMake(open),
  'video-convert-avi': videoConvertAviMake(open),
  'video-convert-flv': videoConvertFlvMake(open),
  'video-convert-gif': videoConvertGifMake(open),
  'video-convert-m4a': videoConvertM4aMake(open),
  'video-convert-mkv': videoConvertMkvMake(open),
  'video-convert-mov': videoConvertMovMake(open),
  'video-convert-mp4': videoConvertMp4Make(open),
  'video-convert-ogg': videoConvertOggMake(open),
  'video-convert-webm': videoConvertWebmMake(open),
  'video-convert-wmv': videoConvertWmvMake(open),
  'video-download': videoDownloadMake(open),
  'video-edit': videoEditMake(open),
  visualization: visualizationMake(open),
  'write-article': writeArticleMake(open),
  'write-business': writeBusinessMake(open),
  'write-content': writeContentMake(open),
  'write-edit': writeEditMake(open),
  'write-misc': writeMiscMake(open),
  'write-real-estate': writeRealEstateMake(open),
  'write-social': writeSocialMake(open),
});
