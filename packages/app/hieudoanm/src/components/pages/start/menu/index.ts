import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

import { make as calculatorMake } from './calculator';
import { make as clocksMake } from './clocks';
import { make as dataCsvMake } from './data-csv';
import { make as dataExcelMake } from './data-excel';
import { make as dataJsonMake } from './data-json';
import { make as dataXmlMake } from './data-xml';
import { make as developerMake } from './developer';
import { make as editorsMake } from './editors';
import { make as educationMake } from './education';
import { make as healthVisionMake } from './health-vision';
import { make as imageMake } from './image';
import { make as markdownMake } from './markdown';
import { make as pdfMake } from './pdf';
import { make as textConvertMake } from './text-convert';
import { make as utilitiesMake } from './utilities';
import { make as videoMake } from './video';
import { make as visualizationMake } from './visualization';
import { make as writeMake } from './write';

const CATEGORY_MAKERS: Record<
  string,
  (open: (id: ModalId) => () => void) => Tool[]
> = {
  calculator: calculatorMake,
  clocks: clocksMake,
  'data-csv': dataCsvMake,
  'data-excel': dataExcelMake,
  'data-json': dataJsonMake,
  'data-xml': dataXmlMake,
  developer: developerMake,
  editors: editorsMake,
  education: educationMake,
  'health-vision': healthVisionMake,
  image: imageMake,
  markdown: markdownMake,
  pdf: pdfMake,
  'text-convert': textConvertMake,
  utilities: utilitiesMake,
  video: videoMake,
  visualization: visualizationMake,
  write: writeMake,
};

export const makeTools = (
  open: (id: ModalId) => () => void
): Record<string, Tool[]> => {
  const result: Record<string, Tool[]> = {};
  for (const [key, make] of Object.entries(CATEGORY_MAKERS)) {
    const ids: ModalId[] = [];
    const trackOpen = (id: ModalId) => {
      ids.push(id);
      return open(id);
    };
    result[key] = make(trackOpen).map((t, i) => ({
      ...t,
      toolId: ids[i],
    }));
  }
  return result;
};
