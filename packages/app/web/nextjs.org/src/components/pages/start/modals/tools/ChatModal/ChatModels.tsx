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

interface ChatModelsProps {
  selectedModelId: string;
  onSelect: (modelId: string) => void;
}

export const ChatModels: FC<ChatModelsProps> = ({
  selectedModelId,
  onSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTokenizer, setSelectedTokenizer] = useState('');

  const { isPending, error, data } = useQuery<{ data: OpenRouterModel[] }>({
    queryKey: ['openrouter', 'models'],
    queryFn: () =>
      fetch('https://openrouter.ai/api/v1/models').then((res) => res.json()),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
  ChatModels.displayName = 'ChatModels';

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
    if (
      selectedTokenizer &&
      model.architecture?.tokenizer !== selectedTokenizer
    ) {
      return false;
    }

    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      model.name.toLowerCase().includes(query) ||
      model.id.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-2 px-3 pt-2.5 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search…"
            className="input input-ghost input-xs w-full rounded-lg bg-neutral-800 pr-6 text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] opacity-30 transition-opacity hover:opacity-60"
              title="Clear search">
              ✕
            </button>
          )}
        </div>

        <select
          className="select select-ghost select-xs w-full rounded-lg bg-neutral-800 text-[10px]"
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

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {isPending ? (
          <p className="py-8 text-center text-[10px] opacity-30">Loading...</p>
        ) : error ? (
          <p className="py-8 text-center text-[10px] text-red-400/50">
            Failed to load
          </p>
        ) : freeModels.length === 0 ? (
          <p className="py-8 text-center text-[10px] opacity-30">
            No free models
          </p>
        ) : filteredModels.length === 0 ? (
          <p className="py-8 text-center text-[10px] opacity-30">No matches</p>
        ) : (
          <ul className="flex flex-col gap-px">
            {filteredModels.map((model) => {
              const isSelected = model.id === selectedModelId;
              return (
                <li
                  key={model.id}
                  onClick={() => onSelect(model.id)}
                  className={`flex cursor-pointer flex-col gap-0.5 rounded-lg px-2.5 py-2 transition-colors ${
                    isSelected ? 'bg-neutral-700/60' : 'hover:bg-neutral-800/60'
                  }`}>
                  <span className="text-xs font-medium">{model.name}</span>
                  <span className="truncate text-[9px] opacity-30">
                    {model.id}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <footer className="border-t border-neutral-800 px-3 py-2.5 text-center">
        <p className="text-[9px] tracking-widest uppercase opacity-15">
          {searchQuery.trim() || selectedTokenizer
            ? `${filteredModels.length} found · ${freeModels.length} total`
            : `${freeModels.length} free`}
        </p>
      </footer>
    </div>
  );
};
