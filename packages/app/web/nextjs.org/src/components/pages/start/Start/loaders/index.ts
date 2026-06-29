import { ComponentType, lazy } from 'react';
import { ModalId } from '../types';

import { loaders as aiLoaders } from './ai';
import { loaders as miscLoaders } from './misc';
import { loaders as visualizationLoaders } from './visualization';
import { loaders as gamesLoaders } from './games';
import { loaders as image_createLoaders } from './image-create';
import { loaders as utilitiesLoaders } from './utilities';
import { loaders as pdf_createLoaders } from './pdf-create';
import { loaders as data_csvLoaders } from './data-csv';
import { loaders as financialLoaders } from './financial';
import { loaders as converterLoaders } from './converter';
import { loaders as pdf_ebookLoaders } from './pdf-ebook';
import { loaders as data_excelLoaders } from './data-excel';
import { loaders as image_editLoaders } from './image-edit';
import { loaders as image_scanLoaders } from './image-scan';
import { loaders as data_xml_jsonLoaders } from './data-xml-json';
import { loaders as formatLoaders } from './format';
import { loaders as educationLoaders } from './education';
import { loaders as pdf_editLoaders } from './pdf-edit';
import { loaders as developerLoaders } from './developer';
import { loaders as editorsLoaders } from './editors';
import { loaders as eyesLoaders } from './eyes';
import { loaders as video_editLoaders } from './video-edit';
import { loaders as write_miscLoaders } from './write-misc';
import { loaders as write_articleLoaders } from './write-article';

const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  ...aiLoaders,
  ...miscLoaders,
  ...visualizationLoaders,
  ...gamesLoaders,
  ...image_createLoaders,
  ...utilitiesLoaders,
  ...pdf_createLoaders,
  ...data_csvLoaders,
  ...financialLoaders,
  ...converterLoaders,
  ...pdf_ebookLoaders,
  ...data_excelLoaders,
  ...image_editLoaders,
  ...image_scanLoaders,
  ...data_xml_jsonLoaders,
  ...formatLoaders,
  ...educationLoaders,
  ...pdf_editLoaders,
  ...developerLoaders,
  ...editorsLoaders,
  ...eyesLoaders,
  ...video_editLoaders,
  ...write_miscLoaders,
  ...write_articleLoaders,
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
