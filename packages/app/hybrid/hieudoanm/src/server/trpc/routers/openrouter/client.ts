import { tryCatch } from '@lodashx/ts';
import OpenAI from 'openai';
import { OpenRouterModel } from './enums';

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY ?? '';

export enum OpenRouterRole {
  User = 'user',
  Assistant = 'assistant',
}

let _openai: OpenAI | null = null;

const getOpenai = (): OpenAI => {
  if (!_openai) {
    _openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: OPEN_ROUTER_API_KEY,
    });
  }
  return _openai;
};

export const complete = async ({
  messages = [],
  model = OpenRouterModel.Deepseek_R1,
}: {
  messages: { role: OpenRouterRole; content: string }[];
  model: OpenRouterModel;
}) => {
  const { data, error } = await tryCatch(
    getOpenai().chat.completions.create({ model, messages }, { timeout: 60000 })
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
