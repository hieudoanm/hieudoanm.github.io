// Models: https://ai.google.dev/gemini-api/docs/models
// Pricing: https://ai.google.dev/gemini-api/docs/pricing
// Rate Limits: https://ai.google.dev/gemini-api/docs/rate-limits
export enum GeminiModel {
  Gemini_2_5_Flash = 'gemini-2.5-flash',
  Gemini_2_0_Flash = 'gemini-2.0-flash',
  Gemini_2_0_Flash_Lite = 'gemini-2.0-flash-lite',
  Gemini_1_5_Flash = 'gemini-1.5-flash',
  Gemini_1_5_Flash_8B = 'gemini-1.5-flash-8b',
}

export enum GeminiRole {
  User = 'user',
  Model = 'model',
}

export type GeminiContent = {
  role: GeminiRole;
  parts: { text: string }[];
};

export type GeminiGenerateContentResponse = {
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
