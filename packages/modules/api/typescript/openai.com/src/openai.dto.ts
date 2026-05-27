export enum Model {
  GPT_4 = 'gpt-4',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_3_5 = 'gpt-3.5-turbo',
}

export type ChatCompletionMessage = {
  role: string;
  content: string;
};

export type ChatCompletionChoice = {
  index: number;
  message: ChatCompletionMessage;
  finish_reason: string;
};

export type ChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
