import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  pricing: {
    prompt: string;
    completion: string;
  };
}

export const FreeModelsTab: FC = () => {
  const { isPending, error, data } = useQuery<{ data: OpenRouterModel[] }>({
    queryKey: ['openrouter', 'models'],
    queryFn: () =>
      fetch('https://openrouter.ai/api/v1/models').then((res) => res.json()),
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });

  const freeModels =
    data?.data?.filter(
      (m) => m.pricing.prompt === '0' && m.pricing.completion === '0'
    ) || [];

  freeModels.sort((a, b) => (a.id < b.id ? -1 : 1));

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        {isPending ? (
          <p className="text-base-content/25 py-8 text-center text-xs">
            Loading models...
          </p>
        ) : error ? (
          <p className="text-error/50 py-8 text-center text-xs">
            Failed to load models
          </p>
        ) : freeModels.length === 0 ? (
          <p className="text-base-content/25 py-8 text-center text-xs">
            No free models found.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5 p-3">
            {freeModels.map((model) => (
              <li
                key={model.id}
                className="hover:bg-base-300 flex flex-col gap-1 rounded-lg px-2 py-2 transition-colors">
                <span className="text-xs font-semibold">{model.name}</span>
                <span className="text-base-content/50 text-[10px] break-all">
                  {model.id}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="border-base-300 border-t px-4 py-4 text-center font-mono">
        <p className="text-xs tracking-widest uppercase opacity-20">
          {freeModels.length} free models
        </p>
      </footer>
    </div>
  );
};
