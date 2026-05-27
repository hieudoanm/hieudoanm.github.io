import type { APIEvent } from '@solidjs/start/server';
import { GeminiModel } from '@hieudoanm.github.io/clients/gemini/gemini.enums';
import { OpenRouterModel } from '@hieudoanm.github.io/clients/openrouter/openrouter.enums';
import { generate } from '@hieudoanm.github.io/services/openrouter/openrouter.service';
import { tryCatch } from '@hieudoanm.github.io/utils/try-catch';

const validateModel = (model: GeminiModel | OpenRouterModel): boolean => {
  return (
    Object.values(GeminiModel).includes(model as GeminiModel) ||
    Object.values(OpenRouterModel).includes(model as OpenRouterModel)
  );
};

export async function POST({ request }: APIEvent) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    });
  }

  const { messages = [], model = '' } = await request.json();
  console.info(`model=${model}`);
  console.info(`message=${messages.at(0)?.text ?? 'empty'}`);

  if (!validateModel(model)) {
    return new Response(
      JSON.stringify({ output: 'Invalid model specified.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const { data, error } = await tryCatch(generate({ messages, model }));
  if (error) {
    console.error(`Error generating content error=${error}`);
    return new Response(
      JSON.stringify({ output: 'An error occurred while generating content.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const output: string = data?.output ?? 'No response generated.';
  return new Response(JSON.stringify({ output }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
