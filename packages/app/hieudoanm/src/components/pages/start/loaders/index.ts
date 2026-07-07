import { ComponentType, lazy } from 'react';
import { ModalId } from '../types';

import { loaders as calculatorFinanceLoaders } from './calculator-finance';
import { loaders as clocksLoaders } from './clocks';
import { loaders as dataCsvLoaders } from './data-csv';
import { loaders as dataExcelLoaders } from './data-excel';
import { loaders as dataJsonLoaders } from './data-json';
import { loaders as dataXmlLoaders } from './data-xml';
import { loaders as developerLoaders } from './developer';
import { loaders as editorsLoaders } from './editors';
import { loaders as educationLoaders } from './education';
import { loaders as gamesArcadeLoaders } from './games-arcade';
import { loaders as gamesCasinoLoaders } from './games-casino';
import { loaders as gamesChessLoaders } from './games-chess';
import { loaders as gamesMemoryLoaders } from './games-memory';
import { loaders as gamesPuzzleLoaders } from './games-puzzle';
import { loaders as gamesTriviaLoaders } from './games-trivia';
import { loaders as gamesWordLoaders } from './games-word';
import { loaders as healthVisionLoaders } from './health-vision';
import { loaders as imageLoaders } from './image';
import { loaders as markdownLoaders } from './markdown';
import { loaders as pdfLoaders } from './pdf';
import { loaders as textConvertLoaders } from './text-convert';
import { loaders as utilitiesLoaders } from './utilities';
import { loaders as videoLoaders } from './video';
import { loaders as visualizationLoaders } from './visualization';
import { loaders as writeLoaders } from './write';

const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  ...calculatorFinanceLoaders,
  ...clocksLoaders,
  ...dataCsvLoaders,
  ...dataExcelLoaders,
  ...dataJsonLoaders,
  ...dataXmlLoaders,
  ...developerLoaders,
  ...editorsLoaders,
  ...educationLoaders,
  ...gamesArcadeLoaders,
  ...gamesCasinoLoaders,
  ...gamesChessLoaders,
  ...gamesMemoryLoaders,
  ...gamesPuzzleLoaders,
  ...gamesTriviaLoaders,
  ...gamesWordLoaders,
  ...healthVisionLoaders,
  ...imageLoaders,
  ...markdownLoaders,
  ...pdfLoaders,
  ...textConvertLoaders,
  ...utilitiesLoaders,
  ...videoLoaders,
  ...visualizationLoaders,
  ...writeLoaders,
};

const cache = new Map<string, ComponentType<{ onClose: () => void }>>();

export const getModalComponent = (
  id: ModalId
): ComponentType<{ onClose: () => void }> | null => {
  const existing = cache.get(id);
  if (existing) return existing;

  const factory = loaders[id];
  if (!factory) return null;

  const Lazy = lazy(factory);
  cache.set(id, Lazy);
  return Lazy;
};
