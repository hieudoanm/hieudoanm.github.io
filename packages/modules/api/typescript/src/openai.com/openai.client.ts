import { ChatCompletionResponse, Model } from './openai.dto.js';

const BASE_URL = 'https://api.openai.com/v1';

export const getChatCompletions = (
  apiKey: string,
  {
    model = Model.GPT_4,
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
