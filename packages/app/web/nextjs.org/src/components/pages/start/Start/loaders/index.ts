import { ComponentType, lazy } from 'react';
import { ModalId } from '../types';

import { loaders as aiLoaders } from './ai';
import { loaders as casinoLoaders } from './casino';
import { loaders as chessLoaders } from './chess';
import { loaders as clocksLoaders } from './clocks';
import { loaders as colorsLoaders } from './colors';
import { loaders as converterLoaders } from './converter';
import { loaders as dataCsvLoaders } from './data-csv';
import { loaders as dataExcelLoaders } from './data-excel';
import { loaders as dataJsonLoaders } from './data-json';
import { loaders as dataXmlLoaders } from './data-xml';
import { loaders as developerLoaders } from './developer';
import { loaders as editorsLoaders } from './editors';
import { loaders as educationLoaders } from './education';
import { loaders as eyesLoaders } from './eyes';
import { loaders as financialLoaders } from './financial';
import { loaders as formatLoaders } from './format';
import { loaders as gamesArcadeLoaders } from './games-arcade';
import { loaders as gamesMemoryLoaders } from './games-memory';
import { loaders as gamesPuzzleLoaders } from './games-puzzle';
import { loaders as gamesTriviaLoaders } from './games-trivia';
import { loaders as gamesWordLoaders } from './games-word';
import { loaders as textConvertLoaders } from './text-convert';
import { loaders as imageConvertJpgLoaders } from './image-convert-jpg';
import { loaders as imageConvertPngLoaders } from './image-convert-png';
import { loaders as imageConvertWebpLoaders } from './image-convert-webp';
import { loaders as imageConvertHeicLoaders } from './image-convert-heic';
import { loaders as imageConvertGifLoaders } from './image-convert-gif';
import { loaders as imageConvertPsdLoaders } from './image-convert-psd';
import { loaders as imageConvertTiffLoaders } from './image-convert-tiff';
import { loaders as imageConvertSvgLoaders } from './image-convert-svg';
import { loaders as imageCreateLoaders } from './image-create';
import { loaders as imageEditLoaders } from './image-edit';
import { loaders as imageEffectLoaders } from './image-effect';
import { loaders as imageScanLoaders } from './image-scan';
import { loaders as pdfConvertLoaders } from './pdf-convert';
import { loaders as pdfCreateLoaders } from './pdf-create';
import { loaders as pdfEbookLoaders } from './pdf-ebook';
import { loaders as pdfEditLoaders } from './pdf-edit';
import { loaders as pdfExtractLoaders } from './pdf-extract';
import { loaders as pdfMiscLoaders } from './pdf-misc';
import { loaders as utilitiesLoaders } from './utilities';
import { loaders as videoAudioLoaders } from './video-audio';
import { loaders as videoConvertAacLoaders } from './video-convert-aac';
import { loaders as videoConvertAviLoaders } from './video-convert-avi';
import { loaders as videoConvertFlvLoaders } from './video-convert-flv';
import { loaders as videoConvertGifLoaders } from './video-convert-gif';
import { loaders as videoConvertM4aLoaders } from './video-convert-m4a';
import { loaders as videoConvertMkvLoaders } from './video-convert-mkv';
import { loaders as videoConvertMovLoaders } from './video-convert-mov';
import { loaders as videoConvertMp4Loaders } from './video-convert-mp4';
import { loaders as videoConvertOggLoaders } from './video-convert-ogg';
import { loaders as videoConvertWmvLoaders } from './video-convert-wmv';
import { loaders as videoConvertWebmLoaders } from './video-convert-webm';
import { loaders as videoDownloadLoaders } from './video-download';
import { loaders as videoEditLoaders } from './video-edit';
import { loaders as visualizationLoaders } from './visualization';
import { loaders as writeArticleLoaders } from './write-article';
import { loaders as writeBusinessLoaders } from './write-business';
import { loaders as writeContentLoaders } from './write-content';
import { loaders as writeEditLoaders } from './write-edit';
import { loaders as writeMiscLoaders } from './write-misc';
import { loaders as writeRealEstateLoaders } from './write-real-estate';
import { loaders as writeSocialLoaders } from './write-social';

const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  ...aiLoaders,
  ...casinoLoaders,
  ...chessLoaders,
  ...clocksLoaders,
  ...colorsLoaders,
  ...converterLoaders,
  ...dataCsvLoaders,
  ...dataExcelLoaders,
  ...dataJsonLoaders,
  ...dataXmlLoaders,
  ...developerLoaders,
  ...editorsLoaders,
  ...educationLoaders,
  ...eyesLoaders,
  ...financialLoaders,
  ...formatLoaders,
  ...gamesArcadeLoaders,
  ...gamesMemoryLoaders,
  ...gamesPuzzleLoaders,
  ...gamesTriviaLoaders,
  ...gamesWordLoaders,
  ...textConvertLoaders,
  ...imageConvertJpgLoaders,
  ...imageConvertPngLoaders,
  ...imageConvertWebpLoaders,
  ...imageConvertHeicLoaders,
  ...imageConvertGifLoaders,
  ...imageConvertPsdLoaders,
  ...imageConvertTiffLoaders,
  ...imageConvertSvgLoaders,
  ...imageCreateLoaders,
  ...imageEditLoaders,
  ...imageEffectLoaders,
  ...imageScanLoaders,
  ...pdfConvertLoaders,
  ...pdfCreateLoaders,
  ...pdfEbookLoaders,
  ...pdfEditLoaders,
  ...pdfExtractLoaders,
  ...pdfMiscLoaders,
  ...utilitiesLoaders,
  ...videoAudioLoaders,
  ...videoConvertAacLoaders,
  ...videoConvertAviLoaders,
  ...videoConvertFlvLoaders,
  ...videoConvertGifLoaders,
  ...videoConvertM4aLoaders,
  ...videoConvertMkvLoaders,
  ...videoConvertMovLoaders,
  ...videoConvertMp4Loaders,
  ...videoConvertOggLoaders,
  ...videoConvertWmvLoaders,
  ...videoConvertWebmLoaders,
  ...videoDownloadLoaders,
  ...videoEditLoaders,
  ...visualizationLoaders,
  ...writeArticleLoaders,
  ...writeBusinessLoaders,
  ...writeContentLoaders,
  ...writeEditLoaders,
  ...writeMiscLoaders,
  ...writeRealEstateLoaders,
  ...writeSocialLoaders,
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
