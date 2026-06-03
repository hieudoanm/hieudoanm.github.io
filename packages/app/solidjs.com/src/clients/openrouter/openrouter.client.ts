import { tryCatch } from '@hieudoanm/try-catch';
import OpenAI from 'openai';
import { OpenRouterModel } from './openrouter.enums';

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY ?? '';

export enum OpenRouterRole {
  User = 'user',
  Assistant = 'assistant',
}

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPEN_ROUTER_API_KEY,
});

export const complete = async ({
  messages = [],
  model = OpenRouterModel.Deepseek_R1,
}: {
  messages: { role: OpenRouterRole; content: string }[];
  model: OpenRouterModel;
}) => {
  const { data, error } = await tryCatch(
    openai.chat.completions.create({ model, messages }, { timeout: 60000 })
  ); // 60 seconds timeout
  if (error) {
    console.error('Error in OpenRouter completion:', error);
    return {
      choices: [
        { message: { content: 'An error occurred while generating content.' } },
      ],
    };
  }
  return data;
};
