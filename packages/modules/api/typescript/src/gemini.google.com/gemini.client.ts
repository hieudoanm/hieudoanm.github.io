import {
  GeminiContent,
  GeminiGenerateContentResponse,
  GeminiModel,
} from './gemini.dto.js';

const tryCatch = async <T, E = Error>(
  promise: Promise<T>
): Promise<{ data: T | null; error: E | null }> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
};

export const generateContent = async (
  apiKey: string,
  {
    model = GeminiModel.Gemini_2_0_Flash,
    contents = [],
    timeout = 60000,
  }: {
    model?: GeminiModel;
    contents: GeminiContent[];
    timeout?: number;
  }
): Promise<GeminiGenerateContentResponse | null> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
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
  const data: GeminiGenerateContentResponse =
    (await response.json()) as GeminiGenerateContentResponse;
  clearTimeout(timer);
  return data;
};
