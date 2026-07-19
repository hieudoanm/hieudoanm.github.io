import { ChatCompletionResponse, Model } from './deepseek.dto.js';

const BASE_URL = 'https://api.deepseek.com';

export const getChatCompletions = (
  apiKey: string,
  {
    model = Model.DEEPSEEK_CHAT,
    content = '',
  }: {
    model?: Model;
    content: string;
  }
): Promise<ChatCompletionResponse> => {
  const url = `${BASE_URL}/chat/completions`;
  const body = {
    model,
    messages: [{ role: 'user', content }],
    stream: false,
  };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
