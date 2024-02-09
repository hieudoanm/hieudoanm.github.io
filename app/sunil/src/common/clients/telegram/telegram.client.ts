import { TELEGRAM_TOKEN } from '@sunil/common/environments/environments';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  DeleteWebhookResponse,
  SetWebhookResponse,
  WebhookInfo,
} from './telegram.dto';
import { ParseMode } from './telegram.enums';

const BASE_URL = 'https://api.telegram.org/bot';
const url = `${BASE_URL}${TELEGRAM_TOKEN}`;

const post = async <T, D>(
  url: string,
  data?: D,
  options: AxiosRequestConfig<D> = {}
): Promise<T> => {
  const response = await axios.post<T, AxiosResponse<T>, D>(url, data, options);
  return response.data;
};

export const sendMessage = async (
  chatId: string,
  message: string,
  parseMode: ParseMode = ParseMode.MARKDOWN
): Promise<void> => {
  if (!chatId) {
    throw new Error('Invalid chatId');
  }
  if (!message) {
    throw new Error('Invalid message');
  }
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('chat_id', chatId);
  urlSearchParams.set('text', message);
  urlSearchParams.set('parse_mode', parseMode);
  const sendMessageUrl = `${url}/sendMessage?${urlSearchParams.toString()}`;
  await post(sendMessageUrl);
};

export const setWebhook = async (url: string): Promise<SetWebhookResponse> => {
  if (!url) {
    throw new Error('Invalid url');
  }
  const setWebhookUrl = `${url}/setWebhook`;
  return post<SetWebhookResponse, { url: string }>(setWebhookUrl, { url });
};

export const deleteWebhook = async (
  url: string
): Promise<DeleteWebhookResponse> => {
  if (!url) {
    throw new Error('Invalid url');
  }
  const setWebhookUrl = `${url}/deleteWebhook`;
  return post<DeleteWebhookResponse, { url: string }>(setWebhookUrl, {
    url,
  });
};

export const getWebhookInfo = async (): Promise<WebhookInfo> => {
  const setWebhookUrl = `${url}/getWebhookInfo`;
  return post<WebhookInfo, undefined>(setWebhookUrl);
};
