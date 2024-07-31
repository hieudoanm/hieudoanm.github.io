import { sendMessage } from '@web/clients/telegram/telegram.client';
import { logger } from '@web/log';
import { NextApiRequest, NextApiResponse } from 'next';

export type TelegramFrom = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
};

export type TelegramChat = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  type: string;
};

export type TelegramMessage = {
  message_id: number;
  from: TelegramFrom;
  chat: TelegramChat;
  date: number;
  text: string;
};

export type TelegramRequestBody = {
  update_id: number;
  message: TelegramMessage;
};

type Message = {
  role: string;
  content: string;
};

type Choice = {
  index: number;
  message: Message;
  finish_reason: string;
};

type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

type GenerativePreTrainingTransformerResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  provider: string;
  choices: Choice[];
  usage: Usage;
};

const getMessage = async (content: string) => {
  try {
    const url: string = 'https://telegram-gpt-mk6x.onrender.com/process';
    const format: string = 'application/json';
    const response: Response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { Accept: format, 'Content-Type': format },
    });
    const data: GenerativePreTrainingTransformerResponse =
      await response.json();
    return data.choices[0].message.content ?? `Echo: ${content}`;
  } catch (error) {
    logger.error(`getMessage error.message=${(error as Error).message}`);
    return `Echo: ${content}`;
  }
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<{ message: string }>
) => {
  const { method } = request;
  if (method === 'POST') {
    const token: string = request.query.token?.toString() ?? '';
    const body: TelegramRequestBody = request.body;
    const chatId: number = body.message.chat.id ?? 0;
    try {
      logger.info(body, 'Request body');
      const message: string = await getMessage(body.message.text ?? '');
      await sendMessage(token, { chatId, message });
    } catch (error) {
      const errorMessage = (error as Error).message;
      await sendMessage(token, { chatId, message: errorMessage });
      logger.error(`getMessage error.message=${errorMessage}`);
    }
    return response.status(200).json({ message: 'OK' });
  }
  return response.status(405).json({ message: 'ERROR' });
};

export default handler;
