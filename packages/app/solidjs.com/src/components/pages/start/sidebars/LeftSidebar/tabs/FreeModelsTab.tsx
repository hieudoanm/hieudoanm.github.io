import { createSignal } from 'solid-js';
import { useQuery } from '@tanstack/solid-query';

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

export const FreeModelsTab = () => {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedTokenizer, setSelectedTokenizer] = createSignal('');

  const { isPending, error, data } = useQuery<{ data: OpenRouterModel[] }>({
    queryKey: ['openrouter', 'models'],
    queryFn: () =>
      fetch('https://openrouter.ai/api/v1/models').then((res) => res.json()),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  const freeModels = () =>
    data()?.data?.filter(
      (m) => m.pricing.prompt === '0' && m.pricing.completion === '0'
    ) || [];

  const sortedFreeModels = () =>
    [...freeModels()].sort((a, b) => (a.id < b.id ? -1 : 1));

  const tokenizers = () =>
    Array.from(
      new Set(
        sortedFreeModels()
          .map((m) => m.architecture?.tokenizer)
          .filter((t): t is string => typeof t === 'string' && t.trim() !== '')
      )
    ).sort();

  const filteredModels = () => {
    const models = sortedFreeModels();
    return models.filter((model) => {
      if (
        selectedTokenizer() &&
        model.architecture?.tokenizer !== selectedTokenizer()
      ) {
        return false;
      }

      const query = searchQuery().toLowerCase().trim();
      if (!query) return true;
      return (
        model.name.toLowerCase().includes(query) ||
        model.id.toLowerCase().includes(query)
      );
    });
  };

  const models = freeModels();
  const filtered = filteredModels();
  const sq = searchQuery();
  const st = selectedTokenizer();

  return (
    <div class="flex h-full flex-col">
      <div class="border-base-300 flex flex-col gap-2 border-b p-3">
        <div class="relative">
          <input
            type="text"
            placeholder="Search models…"
            class="input input-bordered input-xs w-full pr-6"
            value={sq}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
          {sq && (
            <button
              onClick={() => setSearchQuery('')}
              class="text-base-content/50 hover:text-base-content absolute top-1/2 right-2 -translate-y-1/2 text-[10px]"
              title="Clear search">
              ✕
            </button>
          )}
        </div>

        <select
          class="select select-bordered select-xs w-full text-xs font-medium"
          value={st}
          onChange={(e) => setSelectedTokenizer(e.currentTarget.value)}>
          <option value="">All tokenizers</option>
          {tokenizers().map((t) => (
            <option value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div class="flex-1 overflow-y-auto">
        {isPending() ? (
          <p class="text-base-content/25 py-8 text-center text-xs">
            Loading models...
          </p>
        ) : error() ? (
          <p class="text-error/50 py-8 text-center text-xs">
            Failed to load models
          </p>
        ) : models.length === 0 ? (
          <p class="text-base-content/25 py-8 text-center text-xs">
            No free models found.
          </p>
        ) : filtered.length === 0 ? (
          <p class="text-base-content/25 py-8 text-center text-xs">
            No matching models found.
          </p>
        ) : (
          <ul class="flex flex-col gap-0.5 p-3">
            {filtered.map((model) => (
              <li class="hover:bg-base-300 flex flex-col gap-1 rounded-lg px-2 py-2 transition-colors">
                <span class="text-xs font-semibold">{model.name}</span>
                <span class="text-base-content/50 text-[10px] break-all">
                  {model.id}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer class="border-base-300 border-t px-4 py-4 text-center font-mono">
        <p class="text-xs tracking-widest uppercase opacity-20">
          {sq.trim() || st
            ? `${filtered.length} found · ${models.length} total`
            : `${models.length} free models`}
        </p>
      </footer>
    </div>
  );
};
