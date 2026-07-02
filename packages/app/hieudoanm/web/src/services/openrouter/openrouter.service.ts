import { GeminiModel, GeminiRole, generateContent } from '@api/ts';
import {
  complete,
  OpenRouterRole,
} from '@hieudoanm.github.io/clients/openrouter/openrouter.client';
import { OpenRouterModel } from '@hieudoanm.github.io/clients/openrouter/openrouter.enums';
import { models } from '@hieudoanm.github.io/data/models';
import { tryCatch } from '@lodashx/ts';

const ids: string[] = models.map(({ id }) => id);

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
