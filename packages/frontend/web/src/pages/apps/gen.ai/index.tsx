import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

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

const GenerativeAIPage: NextPage = () => {
  const [models, setModels] = useState<Model[]>(
    initialModels.toSorted((a: Model, b: Model) => (a.model > b.model ? 1 : -1))
  );

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-xs flex-col items-center gap-y-2 rounded bg-gray-900 p-4 text-gray-100">
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              className="font-black"
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
              className="font-black"
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
          <hr className="w-full border-white" />
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
                  key={id}
                  className="flex w-full items-center justify-between">
                  <p>
                    <Link
                      href={modelUrl}
                      className="underline decoration-dotted underline-offset-4"
                      target="_blank">
                      {index + 1}. {model}
                    </Link>
                  </p>
                  <p>
                    <Link
                      href={maintainerUrl}
                      className="underline decoration-dotted underline-offset-4"
                      target="_blank">
                      {maintainer}
                    </Link>
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
