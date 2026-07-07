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
import { loaders as imageAiLoaders } from './image-ai';
import { loaders as imageColorLoaders } from './image-color';
import { loaders as imageConvertGifLoaders } from './image-convert-gif';
import { loaders as imageConvertHeicLoaders } from './image-convert-heic';
import { loaders as imageConvertJpgLoaders } from './image-convert-jpg';
import { loaders as imageConvertPngLoaders } from './image-convert-png';
import { loaders as imageConvertPsdLoaders } from './image-convert-psd';
import { loaders as imageConvertSvgLoaders } from './image-convert-svg';
import { loaders as imageConvertTiffLoaders } from './image-convert-tiff';
import { loaders as imageConvertWebpLoaders } from './image-convert-webp';
import { loaders as imageCreateLoaders } from './image-create';
import { loaders as imageEditLoaders } from './image-edit';
import { loaders as imageEffectLoaders } from './image-effect';
import { loaders as imageScanLoaders } from './image-scan';
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
  ...imageAiLoaders,
  ...imageColorLoaders,
  ...imageConvertGifLoaders,
  ...imageConvertHeicLoaders,
  ...imageConvertJpgLoaders,
  ...imageConvertPngLoaders,
  ...imageConvertPsdLoaders,
  ...imageConvertSvgLoaders,
  ...imageConvertTiffLoaders,
  ...imageConvertWebpLoaders,
  ...imageCreateLoaders,
  ...imageEditLoaders,
  ...imageEffectLoaders,
  ...imageScanLoaders,
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
