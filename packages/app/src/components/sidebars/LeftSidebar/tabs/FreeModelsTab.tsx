import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  pricing: {
    prompt: string;
    completion: string;
  };
  architecture: { tokenizer: string };
  supported_parameters: string[];
}

export const FreeModelsTab: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTokenizer, setSelectedTokenizer] = useState('');

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

  const tokenizers = Array.from(
    new Set(
      freeModels
        .map((m) => m.architecture?.tokenizer)
        .filter((t): t is string => typeof t === 'string' && t.trim() !== '')
    )
  ).sort();

  const filteredModels = freeModels.filter((model) => {
    // Filter by tokenizer if one is selected
    if (
      selectedTokenizer &&
      model.architecture?.tokenizer !== selectedTokenizer
    ) {
      return false;
    }

    // Filter by search query
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      model.name.toLowerCase().includes(query) ||
      model.id.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex h-full flex-col">
      {/* Search & Filter Header */}
      <div className="border-base-300 flex flex-col gap-2 border-b p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search models…"
            className="input input-bordered input-xs w-full pr-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-base-content/50 hover:text-base-content absolute top-1/2 right-2 -translate-y-1/2 text-[10px]"
              title="Clear search">
              ✕
            </button>
          )}
        </div>

        <select
          className="select select-bordered select-xs w-full text-xs font-medium"
          value={selectedTokenizer}
          onChange={(e) => setSelectedTokenizer(e.target.value)}>
          <option value="">All tokenizers</option>
          {tokenizers.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

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
        ) : filteredModels.length === 0 ? (
          <p className="text-base-content/25 py-8 text-center text-xs">
            No matching models found.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5 p-3">
            {filteredModels.map((model) => (
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
          {searchQuery.trim() || selectedTokenizer
            ? `${filteredModels.length} found · ${freeModels.length} total`
            : `${freeModels.length} free models`}
        </p>
      </footer>
    </div>
  );
};
