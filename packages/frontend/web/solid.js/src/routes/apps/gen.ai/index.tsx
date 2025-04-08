import { A } from '@solidjs/router';
import { createSignal } from 'solid-js';

type Model = {
  id: string;
  model: string;
  modelUrl: string;
  maintainer: string;
  maintainerUrl: string;
};

const initialModels: Model[] = [
  {
    id: 'claude',
    model: 'Claude',
    modelUrl: 'https://claude.ai/',
    maintainer: 'Anthropic',
    maintainerUrl: 'https://anthropic.com/',
  },
  {
    id: 'deepseek',
    model: 'DeepSeek',
    modelUrl: 'https://chat.deepseek.com/',
    maintainer: 'DeepSeek AI',
    maintainerUrl: 'https://deepseek.ai/',
  },
  {
    id: 'gemini',
    model: 'Gemini',
    modelUrl: 'https://gemini.google.com/',
    maintainer: 'Google',
    maintainerUrl: 'https://google.com/',
  },
  {
    id: 'copilot',
    model: 'Copilot',
    modelUrl: 'https://copilot.microsoft.com/',
    maintainer: 'Microsoft',
    maintainerUrl: 'https://microsoft.com/',
  },
  {
    id: 'chatgpt',
    model: 'ChatGPT',
    modelUrl: 'https://chatgpt.com/',
    maintainer: 'OpenAI',
    maintainerUrl: 'https://openai.com/',
  },
  {
    id: 'llama',
    model: 'Llama',
    modelUrl: 'https://www.llama.com/',
    maintainer: 'Meta',
    maintainerUrl: 'https://developers.meta.com/',
  },
];

const GenerativeAIPage = () => {
  const [models, setModels] = createSignal<Model[]>(
    initialModels.toSorted((a: Model, b: Model) => (a.model > b.model ? 1 : -1))
  );

  return (
    <div class="h-screen w-screen">
      <div class="flex h-full w-full items-center justify-center">
        <div class="flex w-full max-w-xs flex-col items-center gap-y-2 rounded bg-gray-900 p-4 text-gray-100">
          <div class="flex w-full items-center justify-between">
            <button
              type="button"
              class="font-black"
              onClick={() => {
                setModels((previous) => {
                  previous.sort((a, b) => (a.model > b.model ? 1 : -1));
                  return previous;
                });
              }}>
              Model
            </button>
            <button
              type="button"
              class="font-black"
              onClick={() => {
                setModels((previous) => {
                  previous.sort((a, b) =>
                    a.maintainer > b.maintainer ? 1 : -1
                  );
                  return previous;
                });
              }}>
              Maintainer
            </button>
          </div>
          <hr class="w-full border-white" />
          {models.map(
            (
              {
                id = '',
                model = '',
                modelUrl = '',
                maintainer = '',
                maintainerUrl = '',
              },
              index: number
            ) => {
              return (
                <div
                  title={id}
                  class="flex w-full items-center justify-between">
                  <p>
                    <A
                      href={modelUrl}
                      class="underline decoration-dotted underline-offset-4"
                      target="_blank">
                      {index + 1}. {model}
                    </A>
                  </p>
                  <p>
                    <A
                      href={maintainerUrl}
                      class="underline decoration-dotted underline-offset-4"
                      target="_blank">
                      {maintainer}
                    </A>
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerativeAIPage;
