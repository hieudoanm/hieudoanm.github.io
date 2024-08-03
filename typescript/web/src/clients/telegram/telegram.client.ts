import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  DeleteWebhookResponse,
  SetWebhookResponse,
  WebhookInfo,
} from './telegram.dto';
import { ParseMode } from './telegram.enums';
import { logger } from '@web/log';

const BASE_URL = 'https://api.telegram.org/bot';

const INVALID_TOKEN: string = 'Invalid token';

const post = async <T, D>(
  url: string,
  data?: D,
  options: AxiosRequestConfig<D> = {}
): Promise<T> => {
  try {
    const encodedUrl = encodeURI(url);
    const response: AxiosResponse<T> = await axios.post<T, AxiosResponse<T>, D>(
      encodedUrl,
      data,
      options
    );
    return response.data;
  } catch (error) {
    const genericMessage: string = (error as AxiosError).message;
    const descriptionMessage =
      (error as AxiosError<{ description: string }>).response?.data
        ?.description ?? '';
    const message = descriptionMessage ?? genericMessage;
    logger.error('Error Message', message);
    throw new Error(message);
  }
};

export const sendMessage = async (
  token: string,
  {
    chatId = 0,
    message = '',
    parseMode = ParseMode.MARKDOWN,
  }: { chatId: number; message: string; parseMode?: ParseMode }
): Promise<void> => {
  if (!token) throw new Error(INVALID_TOKEN);
  if (!chatId) throw new Error('Invalid chatId');
  if (!message) throw new Error('Invalid message');
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('chat_id', chatId.toString());
  urlSearchParams.set('text', message);
  urlSearchParams.set('parse_mode', parseMode);
  const sendMessageUrl = `${BASE_URL}${token}/sendMessage?${urlSearchParams.toString()}`;
  await post(sendMessageUrl);
};

export const setWebhook = async (
  token: string,
  url: string
): Promise<SetWebhookResponse> => {
  if (!token) throw new Error(INVALID_TOKEN);
  if (!url) throw new Error('Invalid url');
  const setWebhookUrl = `${BASE_URL}${token}/setWebhook`;
  return post<SetWebhookResponse, { url: string }>(setWebhookUrl, { url });
};

export const deleteWebhook = async (
  token: string,
  url: string
): Promise<DeleteWebhookResponse> => {
  if (!token) throw new Error(INVALID_TOKEN);
  if (!url) throw new Error('Invalid url');
  const deleteWebhookUrl = `${BASE_URL}${token}/deleteWebhook`;
  return post<DeleteWebhookResponse, { url: string }>(deleteWebhookUrl, {
    url,
  });
};

export const getWebhookInfo = async (token: string): Promise<WebhookInfo> => {
  if (!token) throw new Error(INVALID_TOKEN);
  const getWebhookInfoUrl = `${BASE_URL}${token}/getWebhookInfo`;
  return post<WebhookInfo, undefined>(getWebhookInfoUrl);
};
