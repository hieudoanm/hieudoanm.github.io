import {
  GeminiRole,
  generateContent,
} from '@hieudoanm.github.io/clients/gemini/gemini.client';
import { GeminiModel } from '@hieudoanm.github.io/clients/gemini/gemini.enums';
import {
  complete,
  OpenRouterRole,
} from '@hieudoanm.github.io/clients/openrouter/openrouter.client';
import { OpenRouterModel } from '@hieudoanm.github.io/clients/openrouter/openrouter.enums';
import { models } from '@hieudoanm.github.io/data/models';
import { tryCatch } from '@hieudoanm.github.io/utils/try-catch';

const ids: string[] = models.map(({ id }) => id);

export const generate = async ({
  messages = [],
  model,
}: {
  messages: { role: 'ai' | 'user'; text: string }[];
  model: GeminiModel | OpenRouterModel;
}): Promise<{ output: string; model: GeminiModel | OpenRouterModel }> => {
  if (Object.values(GeminiModel).includes(model as GeminiModel)) {
    const contents = messages.map((message) => {
      return {
        role: message.role === 'user' ? GeminiRole.User : GeminiRole.Model,
        parts: [{ text: message.text }],
      };
    });
    const { data, error } = await tryCatch(
      generateContent({ contents, model: model as GeminiModel })
    );
    if (error) {
      console.error('Error generating content:', error);
      return { output: 'An error occurred while generating content.', model };
    }
    if (!data) {
      return { output: 'No response generated.', model };
    }
    const output: string =
      data.candidates.at(0)?.content.parts.at(0)?.text ??
      'No response generated.';
    return { output, model };
  } else if (ids.includes(model)) {
    const openRouterMessages = messages.map((message) => ({
      role:
        message.role === 'user'
          ? OpenRouterRole.User
          : OpenRouterRole.Assistant,
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
  }
  return { model, output: 'Model not supported.' };
};
