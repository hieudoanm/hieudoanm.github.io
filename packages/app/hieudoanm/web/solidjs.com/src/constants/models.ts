import { GeminiModel } from '@hieudoanm.github.io/clients/gemini/gemini.enums';
import { OpenRouterModel } from '@hieudoanm.github.io/clients/openrouter/openrouter.enums';

type Model = {
  company: string;
  label: string;
  value: OpenRouterModel | GeminiModel;
};

export const MODELS: Model[] = [
  // Deepseek
  {
    company: 'Deepseek',
    label: 'Deepseek R1',
    value: OpenRouterModel.Deepseek_R1,
  },
  {
    company: 'Deepseek',
    label: 'Deepseek V3',
    value: OpenRouterModel.Deepseek_V3,
  },
  // Google
  {
    company: 'Google Gemini',
    label: 'Gemini 2.5 Flash',
    value: GeminiModel.Gemini_2_5_Flash,
  },
  {
    company: 'Google Gemini',
    label: 'Gemini 2.0 Flash',
    value: GeminiModel.Gemini_2_0_Flash,
  },
  {
    company: 'Google Gemini',
    label: 'Gemini 2.0 Flash Lite',
    value: GeminiModel.Gemini_2_0_Flash_Lite,
  },
  {
    company: 'Google Gemini',
    label: 'Gemini 1.5 Flash',
    value: GeminiModel.Gemini_1_5_Flash,
  },
  {
    company: 'Google Gemini',
    label: 'Gemini 1.5 Flash-8B',
    value: GeminiModel.Gemini_1_5_Flash_8B,
  },
  {
    company: 'Google Gemma',
    label: 'Gemma 3 27B',
    value: OpenRouterModel.Google_Gemma_3_27B,
  },
  {
    company: 'Google Gemma',
    label: 'Gemma 3 12B',
    value: OpenRouterModel.Google_Gemma_3_12B,
  },
  {
    company: 'Google Gemma',
    label: 'Gemma 3 4B',
    value: OpenRouterModel.Google_Gemma_3_4B,
  },
  {
    company: 'Google Gemma',
    label: 'Gemma 3n 4B',
    value: OpenRouterModel.Google_Gemma_3n_4B,
  },
  {
    company: 'Google Gemma',
    label: 'Gemma 2 9B',
    value: OpenRouterModel.Google_Gemma_2_9B,
  },
  // Meta
  {
    company: 'Meta',
    label: 'Llama 4 Maverick',
    value: OpenRouterModel.Meta_Llama_4_Maverick,
  },
  {
    company: 'Meta',
    label: 'Llama 4 Scout',
    value: OpenRouterModel.Meta_Llama_4_Scout,
  },
  {
    company: 'Meta',
    label: 'Llama 3.3 70B Instruct',
    value: OpenRouterModel.Meta_Llama_3_3_70B_Instruct,
  },
  {
    company: 'Meta',
    label: 'Llama 3.3 11B Vision Instruct',
    value: OpenRouterModel.Meta_Llama_3_3_11B_Vision_Instruct,
  },
  {
    company: 'Meta',
    label: 'Llama 3.3 8B Instruct',
    value: OpenRouterModel.Meta_Llama_3_3_8B_Instruct,
  },
  {
    company: 'Meta',
    label: 'Llama 3.3 1B Instruct',
    value: OpenRouterModel.Meta_Llama_3_3_1B_Instruct,
  },
  // Microsoft
  {
    company: 'Microsoft',
    label: 'MAI DS R1',
    value: OpenRouterModel.Microsoft_MAI_DS_R1,
  },
  // Mistral AI
  {
    company: 'Mistral',
    label: 'Mistral 7B Instruct',
    value: OpenRouterModel.Mistral_AI_7B_Instruct,
  },
  {
    company: 'Mistral',
    label: 'Mistral Nemo',
    value: OpenRouterModel.Mistral_AI_Nemo,
  },
  {
    company: 'Mistral',
    label: 'Mistral Small 3.2 24B Instruct',
    value: OpenRouterModel.Mistral_AI_Small_3_2,
  },
  {
    company: 'Mistral',
    label: 'Mistral Small 3.1 24B Instruct',
    value: OpenRouterModel.Mistral_AI_Small_3_1,
  },
  {
    company: 'Mistral',
    label: 'Mistral Small 24B Instruct 2501',
    value: OpenRouterModel.Mistral_AI_Small_24B,
  },
  // Moonshot AI
  {
    company: 'MoonshotAI',
    label: 'MoonshotAI: Kimi Dev 72b',
    value: OpenRouterModel.Moonshot_AI_Kimi_Dev_72b,
  },
  {
    company: 'MoonshotAI',
    label: 'MoonshotAI: Kimi VL A3B Thinking',
    value: OpenRouterModel.Moonshot_AI_Kimi_VL_A3B_Thinking,
  },
  // NVIDIA
  {
    company: 'NVIDIA',
    label: 'Llama 3.3 Nemotron Super 49B v1',
    value: OpenRouterModel.NVIDIA_3_1_Nemotron_Ultra_253B_V1,
  },
  {
    company: 'NVIDIA',
    label: 'Llama 3.1 Nemotron Ultra 253B v1',
    value: OpenRouterModel.NVIDIA_3_3_Nemotron_Super_49B_V1,
  },
  // Qwen
  {
    company: 'Qwen',
    label: 'Qwen3 235B A22B',
    value: OpenRouterModel.Qwen_3_235B_A22B,
  },
  { company: 'Qwen', label: 'Qwen3 32B', value: OpenRouterModel.Qwen_3_32B },
  {
    company: 'Qwen',
    label: 'Qwen3 30B A3B',
    value: OpenRouterModel.Qwen_3_30B_A3B,
  },
  { company: 'Qwen', label: 'Qwen3 14B', value: OpenRouterModel.Qwen_3_14B },
  { company: 'Qwen', label: 'Qwen3 8B', value: OpenRouterModel.Qwen_3_8B },
  { company: 'Qwen', label: 'Qwen3 4B', value: OpenRouterModel.Qwen_3_4B },
  {
    company: 'Qwen',
    label: 'Qwen2.5 VL 72B Instruct',
    value: OpenRouterModel.Qwen_2_5_VL_72B_Instruct,
  },
  {
    company: 'Qwen',
    label: 'Qwen2.5 VL 32B Instruct',
    value: OpenRouterModel.Qwen_2_5_VL_32B_Instruct,
  },
];
