import { complete, OpenRouterRole } from './client';
import { OpenRouterModel } from './enums';
import { tryCatch } from '@lodashx/ts';

export const generate = async ({
  messages = [],
  model,
}: {
  messages: { role: 'ai' | 'user'; text: string }[];
  model: string;
}): Promise<{ output: string; model: string }> => {
  const openRouterMessages = messages.map((message) => ({
    role:
      message.role === 'user' ? OpenRouterRole.User : OpenRouterRole.Assistant,
    content: message.text,
  }));
  const { data, error } = await tryCatch(
    complete({
      messages: openRouterMessages,
      model: model as OpenRouterModel,
    })
  );
  if (error) {
    console.error('Error generating content:', error);
    return { model, output: 'An error occurred while generating content.' };
  }
  const output: string =
    data.choices.at(0)?.message.content ?? 'No response generated.';
  return { model, output };
};
