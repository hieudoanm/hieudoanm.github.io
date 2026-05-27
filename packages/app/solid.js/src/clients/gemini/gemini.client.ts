import { tryCatch } from '@hieudoanm/try-catch';
import { GeminiModel } from './gemini.enums';

const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY ?? '';

export enum GeminiRole {
  User = 'user',
  Model = 'model',
}

export type Content = {
  role: GeminiRole;
  parts: { text: string }[];
};

export type GenerateContentResponse = {
  candidates: [
    {
      content: { role: GeminiRole; parts: { text: string }[] };
      finishReason: string;
      avgLogprobs: number;
    },
  ];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: [{ modality: string; tokenCount: number }];
    candidatesTokensDetails: [{ modality: string; tokenCount: number }];
  };
  modelVersion: string;
  responseId: string;
};

export const generateContent = async ({
  model = GeminiModel.Gemini_2_0_Flash,
  contents = [],
  timeout = 60000, // 60 seconds by default
}: {
  model?: GeminiModel;
  contents: Content[];
  timeout?: number;
}): Promise<GenerateContentResponse | null> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GOOGLE_GEMINI_API_KEY}`;
  const method: string = 'POST';
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const requestBody = { contents };
  const body: string = JSON.stringify(requestBody);
  const { data: response, error } = await tryCatch(
    fetch(url, { method, headers, body, signal: controller.signal })
  );
  if (error) {
    clearTimeout(timer);
    console.error('Error in generateContent:', error);
    return null;
  }
  if (!response?.ok) {
    clearTimeout(timer);
    console.error(
      `Failed to generate content: ${response?.statusText ?? 'Unknown error'}`
    );
    return null;
  }
  const data: GenerateContentResponse = await response.json();
  clearTimeout(timer);
  return data;
};
