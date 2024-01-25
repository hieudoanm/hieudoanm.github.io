import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  DeleteWebhookResponse,
  SetWebhookResponse,
  WebhookInfo,
} from './telegram.dto';
import { ParseMode } from './telegram.enums';

const BASE_URL = 'https://api.telegram.org/bot';

export class TelegramClient {
  private url = '';

  constructor({ token }: { token: string }) {
    this.url = `${BASE_URL}${token}`;
  }

  private async post<T, D>(
    url: string,
    data?: D,
    options: AxiosRequestConfig<D> = {}
  ): Promise<T> {
    const response = await axios.post<T, AxiosResponse<T>, D>(
      url,
      data,
      options
    );
    return response.data;
  }

  public async sendMessage(
    chatId: string,
    message: string,
    parseMode: ParseMode = ParseMode.MARKDOWN
  ): Promise<void> {
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
    const sendMessageUrl = `${
      this.url
    }/sendMessage?${urlSearchParams.toString()}`;
    await this.post(sendMessageUrl);
  }

  public async setWebhook(url: string): Promise<SetWebhookResponse> {
    if (!url) {
      throw new Error('Invalid url');
    }
    const setWebhookUrl = `${this.url}/setWebhook`;
    return this.post<SetWebhookResponse, { url: string }>(setWebhookUrl, {
      url,
    });
  }

  public async deleteWebhook(url: string): Promise<DeleteWebhookResponse> {
    if (!url) {
      throw new Error('Invalid url');
    }
    const setWebhookUrl = `${this.url}/deleteWebhook`;
    return this.post<DeleteWebhookResponse, { url: string }>(setWebhookUrl, {
      url,
    });
  }

  public async getWebhookInfo(): Promise<WebhookInfo> {
    const setWebhookUrl = `${this.url}/getWebhookInfo`;
    return this.post<WebhookInfo, undefined>(setWebhookUrl);
  }
}

export * from './telegram.dto';
export * from './telegram.enums';
export default TelegramClient;
