import { ComponentType, lazy } from 'react';
import { ModalId } from '../types';

import { loaders as aiLoaders } from './ai';
import { loaders as casinoLoaders } from './casino';
import { loaders as clocksLoaders } from './clocks';
import { loaders as converterLoaders } from './converter';
import { loaders as data_csvLoaders } from './data-csv';
import { loaders as data_excelLoaders } from './data-excel';
import { loaders as data_utilityLoaders } from './data-utility';
import { loaders as data_xml_jsonLoaders } from './data-xml-json';
import { loaders as developerLoaders } from './developer';
import { loaders as editorsLoaders } from './editors';
import { loaders as educationLoaders } from './education';
import { loaders as eyesLoaders } from './eyes';
import { loaders as financialLoaders } from './financial';
import { loaders as formatLoaders } from './format';
import { loaders as gamesLoaders } from './games';
import { loaders as image_convertLoaders } from './image-convert';
import { loaders as image_convert_plusLoaders } from './image-convert-plus';
import { loaders as image_convert_proLoaders } from './image-convert-pro';
import { loaders as image_createLoaders } from './image-create';
import { loaders as image_editLoaders } from './image-edit';
import { loaders as image_effectLoaders } from './image-effect';
import { loaders as image_scanLoaders } from './image-scan';
import { loaders as memoryLoaders } from './memory';
import { loaders as pdf_convertLoaders } from './pdf-convert';
import { loaders as pdf_createLoaders } from './pdf-create';
import { loaders as pdf_ebookLoaders } from './pdf-ebook';
import { loaders as pdf_editLoaders } from './pdf-edit';
import { loaders as pdf_extractLoaders } from './pdf-extract';
import { loaders as pdf_miscLoaders } from './pdf-misc';
import { loaders as utilitiesLoaders } from './utilities';
import { loaders as video_audioLoaders } from './video-audio';
import { loaders as video_convertLoaders } from './video-convert';
import { loaders as video_convert_audioLoaders } from './video-convert-audio';
import { loaders as video_convert_miscLoaders } from './video-convert-misc';
import { loaders as video_downloadLoaders } from './video-download';
import { loaders as video_editLoaders } from './video-edit';
import { loaders as visualizationLoaders } from './visualization';
import { loaders as write_articleLoaders } from './write-article';
import { loaders as write_businessLoaders } from './write-business';
import { loaders as write_contentLoaders } from './write-content';
import { loaders as write_editLoaders } from './write-edit';
import { loaders as write_miscLoaders } from './write-misc';
import { loaders as write_real_estateLoaders } from './write-real-estate';
import { loaders as write_socialLoaders } from './write-social';

const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  ...aiLoaders,
  ...casinoLoaders,
  ...clocksLoaders,
  ...converterLoaders,
  ...data_csvLoaders,
  ...data_excelLoaders,
  ...data_utilityLoaders,
  ...data_xml_jsonLoaders,
  ...developerLoaders,
  ...editorsLoaders,
  ...educationLoaders,
  ...eyesLoaders,
  ...financialLoaders,
  ...formatLoaders,
  ...gamesLoaders,
  ...image_convertLoaders,
  ...image_convert_plusLoaders,
  ...image_convert_proLoaders,
  ...image_createLoaders,
  ...image_editLoaders,
  ...image_effectLoaders,
  ...image_scanLoaders,
  ...memoryLoaders,
  ...pdf_convertLoaders,
  ...pdf_createLoaders,
  ...pdf_ebookLoaders,
  ...pdf_editLoaders,
  ...pdf_extractLoaders,
  ...pdf_miscLoaders,
  ...utilitiesLoaders,
  ...video_audioLoaders,
  ...video_convertLoaders,
  ...video_convert_audioLoaders,
  ...video_convert_miscLoaders,
  ...video_downloadLoaders,
  ...video_editLoaders,
  ...visualizationLoaders,
  ...write_articleLoaders,
  ...write_businessLoaders,
  ...write_contentLoaders,
  ...write_editLoaders,
  ...write_miscLoaders,
  ...write_real_estateLoaders,
  ...write_socialLoaders,
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
