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
import { make as imageMake } from './image';
import { make as markdownMake } from './markdown';
import { make as pdfMake } from './pdf';
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
  image: imageMake(open),
  markdown: markdownMake(open),
  pdf: pdfMake(open),
  'text-convert': textConvertMake(open),
  utilities: utilitiesMake(open),
  video: videoMake(open),
  visualization: visualizationMake(open),
  write: writeMake(open),
});
