import type { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import type { ModalId } from '@hieudoanm.github.io/components/pages/start/types';

import { make as calculatorMake } from '@hieudoanm.github.io/components/pages/start/menu/calculator';
import { make as clocksMake } from '@hieudoanm.github.io/components/pages/start/menu/clocks';
import { make as dataCsvMake } from '@hieudoanm.github.io/components/pages/start/menu/data-csv';
import { make as dataExcelMake } from '@hieudoanm.github.io/components/pages/start/menu/data-excel';
import { make as dataJsonMake } from '@hieudoanm.github.io/components/pages/start/menu/data-json';
import { make as dataXmlMake } from '@hieudoanm.github.io/components/pages/start/menu/data-xml';
import { make as developerMake } from '@hieudoanm.github.io/components/pages/start/menu/developer';
import { make as editorsMake } from '@hieudoanm.github.io/components/pages/start/menu/editors';
import { make as educationMake } from '@hieudoanm.github.io/components/pages/start/menu/education';
import { make as healthVisionMake } from '@hieudoanm.github.io/components/pages/start/menu/health-vision';
import { make as imageMake } from '@hieudoanm.github.io/components/pages/start/menu/image';
import { make as markdownMake } from '@hieudoanm.github.io/components/pages/start/menu/markdown';
import { make as pdfMake } from '@hieudoanm.github.io/components/pages/start/menu/pdf';
import { make as textConvertMake } from '@hieudoanm.github.io/components/pages/start/menu/text-convert';
import { make as utilitiesMake } from '@hieudoanm.github.io/components/pages/start/menu/utilities';
import { make as videoMake } from '@hieudoanm.github.io/components/pages/start/menu/video';
import { make as visualizationMake } from '@hieudoanm.github.io/components/pages/start/menu/visualization';
import { make as writeMake } from '@hieudoanm.github.io/components/pages/start/menu/write';

interface CategoryConfig {
  make: (open: (id: ModalId) => () => void) => Tool[];
}

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  calculator: { make: calculatorMake },
  clocks: { make: clocksMake },
  'data-csv': { make: dataCsvMake },
  'data-excel': { make: dataExcelMake },
  'data-json': { make: dataJsonMake },
  'data-xml': { make: dataXmlMake },
  developer: { make: developerMake },
  editors: { make: editorsMake },
  education: { make: educationMake },
  'health-vision': { make: healthVisionMake },
  image: { make: imageMake },
  markdown: { make: markdownMake },
  pdf: { make: pdfMake },
  'text-convert': { make: textConvertMake },
  utilities: { make: utilitiesMake },
  video: { make: videoMake },
  visualization: { make: visualizationMake },
  write: { make: writeMake },
};
