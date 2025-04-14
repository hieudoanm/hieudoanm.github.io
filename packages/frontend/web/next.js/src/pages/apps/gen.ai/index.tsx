import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

type Model = {
  id: string;
  model: {
    text: { name: string; url: string };
    image: { name: string; url: string };
  };
  maintainer: { name: string; url: string };
};

const initialModels: Model[] = [
  {
    id: 'midjourney',
    model: {
      text: { name: '', url: '' },
      image: { name: 'Midjourney', url: 'https://www.midjourney.com' },
    },
    maintainer: {
      name: 'Midjourney',
      url: 'https://www.midjourney.com',
    },
  },
  {
    id: 'grok',
    model: {
      text: { name: 'Grok', url: 'https://grok.com' },
      image: { name: '', url: '' },
    },
    maintainer: {
      name: 'X.AI',
      url: 'https://x.ai/',
    },
  },
  {
    id: 'poe',
    model: {
      text: {
        name: 'Poe',
        url: 'https://www.poe.com/',
      },
      image: { name: '', url: '' },
    },
    maintainer: { name: 'Quora', url: 'https://www.quora.com/' },
  },
  {
    id: 'perplexity',
    model: {
      text: { name: 'Perplexity', url: 'https://www.perplexity.ai/' },
      image: { name: '', url: '' },
    },
    maintainer: {
      name: 'Perplexity',
      url: 'https://www.perplexity.ai/',
    },
  },
  {
    id: 'claude',
    model: {
      text: { name: 'Claude', url: 'https://claude.ai/' },
      image: { name: '', url: '' },
    },
    maintainer: {
      name: 'Anthropic',
      url: 'https://anthropic.com/',
    },
  },
  {
    id: 'deepseek',
    model: {
      text: { name: 'DeepSeek', url: 'https://chat.deepseek.com/' },
      image: { name: '', url: '' },
    },
    maintainer: {
      name: 'DeepSeek AI',
      url: 'https://deepseek.ai/',
    },
  },
  {
    id: 'gemini',
    model: {
      text: { name: 'Gemini', url: 'https://gemini.google.com/' },
      image: { name: '', url: '' },
    },
    maintainer: {
      name: 'Google',
      url: 'https://google.com/',
    },
  },
  {
    id: 'copilot',
    model: {
      text: { name: 'Copilot', url: 'https://copilot.microsoft.com/' },
      image: { name: '', url: '' },
    },
    maintainer: {
      name: 'Microsoft',
      url: 'https://microsoft.com/',
    },
  },
  {
    id: 'chatgpt',
    model: {
      text: { name: 'ChatGPT', url: 'https://chatgpt.com/' },
      image: { name: '', url: '' },
    },
    maintainer: {
      name: 'OpenAI',
      url: 'https://openai.com/',
    },
  },
  {
    id: 'llama',
    model: {
      text: { name: 'Llama', url: 'https://www.llama.com/' },
      image: { name: '', url: '' },
    },
    maintainer: {
      name: 'Meta',
      url: 'https://developers.meta.com/',
    },
  },
];

initialModels.sort((a: Model, b: Model) =>
  a.model.text.name > b.model.text.name ? 1 : -1
);

const GenerativeAIPage: NextPage = () => {
  const [models, setModels] = useState<Model[]>(initialModels);

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-lg flex-col items-center gap-y-2 rounded bg-gray-900 p-4 text-gray-100">
          <table className="w-full">
            <thead>
              <tr>
                <th align="left">No</th>
                <th align="left">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setModels((previous) => {
                        previous.sort((a, b) =>
                          a.model.text.name > b.model.text.name ? 1 : -1
                        );
                        console.log(previous);
                        return previous;
                      });
                    }}>
                    Text Model
                  </button>
                </th>
                <th align="left">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setModels((previous) => {
                        previous.sort((a, b) =>
                          a.model.image.name > b.model.image.name ? 1 : -1
                        );
                        console.log(previous);
                        return previous;
                      });
                    }}>
                    Image Model
                  </button>
                </th>
                <th align="left">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setModels((previous) => {
                        previous.sort((a, b) =>
                          a.maintainer.name > b.maintainer.name ? 1 : -1
                        );
                        console.log(previous);
                        return previous;
                      });
                    }}>
                    Maintainer
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {models.map(
                ({ id = '', model = {}, maintainer = {} }, index: number) => {
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          href={model.text?.url ?? ''}
                          className="underline decoration-dotted underline-offset-4"
                          target="_blank">
                          {model.text?.name}
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={model.image?.url ?? ''}
                          className="underline decoration-dotted underline-offset-4"
                          target="_blank">
                          {model.image?.name}
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={maintainer.url ?? ''}
                          className="underline decoration-dotted underline-offset-4"
                          target="_blank">
                          {maintainer.name}
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GenerativeAIPage;
