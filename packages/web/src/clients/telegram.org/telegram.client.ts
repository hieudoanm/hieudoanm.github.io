export type SetWebhookResponse = {
  ok: boolean;
  result: boolean;
  description: string;
};

export type DeleteWebhookResponse = {
  ok: boolean;
  result: boolean;
  description: string;
};

export type WebhookResult = {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
};

export type WebhookInfo = {
  ok: boolean;
  result: WebhookResult;
};

export enum ParseMode {
  HTML = 'html',
  MARKDOWN = 'markdown',
}

const BASE_URL = 'https://api.telegram.org/bot';

const INVALID_TOKEN: string = 'Invalid token';

const post = async <T, D>(url: string, requestBody?: D): Promise<T> => {
  try {
    const encodedUrl = encodeURI(url);
    const response = await fetch(encodedUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const data: T = await response.json();
    return data;
  } catch (error) {
    const message: string = (error as Error).message;
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
