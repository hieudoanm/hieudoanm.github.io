import { getId, getWork } from '@crossref.org/api';
import type { Reference } from '@crossref.org/api';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { tryCatch } from '@hieudoanm.github.io/utils/try-catch';
import { createSignal } from 'solid-js';

const ReferenceCard = ({
  reference,
  onDelete,
}: {
  reference: Reference;
  onDelete: () => void;
}) => {
  const authors = reference.authors
    .map((a) => `${a.family}, ${a.given.charAt(0)}.`)
    .join(', ')
    .replace(/, ([^,]*)$/, ', & $1');

  const journalPart = `${reference.volume}${
    reference.issue ? `(${reference.issue})` : ''
  }, ${reference.pages}`;

  return (
    <div class="border-base-300 bg-base-200 rounded-lg border p-4 text-sm">
      <p class="text-base-content">
        <span class="font-medium">{authors}</span> ({reference.year}).{' '}
        <em>{reference.title}</em>. <em>{reference.journal}</em>. {journalPart}.
      </p>
      <div class="mt-2 flex items-center justify-between gap-4">
        <a
          href={reference.url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-info truncate text-xs hover:underline">
          {reference.url}
        </a>
        <button
          class="btn btn-ghost btn-xs text-error shrink-0"
          onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

const ReferenceTable = ({
  references,
  onDelete,
}: {
  references: Reference[];
  onDelete: (index: number) => void;
}) => (
  <div class="border-base-300 overflow-x-auto rounded-lg border">
    <table class="table-sm table w-full">
      <thead class="bg-base-200">
        <tr>
          {[
            'Authors',
            'Year',
            'Title',
            'Journal',
            'Vol / Pages',
            'Link',
            '',
          ].map((h) => (
            <th key={h} class="text-base-content/60 font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {references.map((ref, i) => (
          <tr key={`${ref.id}-${i}`} class="hover:bg-base-200/50">
            <td class="max-w-[140px] truncate">
              {ref.authors.map((a) => `${a.family} ${a.given}`).join(', ')}
            </td>
            <td>{ref.year}</td>
            <td class="max-w-[180px] truncate">{ref.title}</td>
            <td class="max-w-[120px] truncate italic">{ref.journal}</td>
            <td>
              {ref.volume}
              {ref.issue ? `(${ref.issue})` : ''}, {ref.pages}
            </td>
            <td>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-info hover:underline">
                View
              </a>
            </td>
            <td>
              <button
                class="btn btn-ghost btn-xs text-error"
                onClick={() => onDelete(i)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const DOIModal = ({ onClose }: { onClose: () => void }) => {
  const [doi, setDoi] = createSignal(
    'https://doi.org/10.1016/j.smrv.2009.04.001'
  );
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');
  const [tab, setTab] = createSignal<'references' | 'table'>('references');
  const [refs, setRefs] = createSignal<Reference[]>([]);

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    const id = getId(doi());
    if (!id) {
      setError('Invalid DOI format.');
      return;
    }
    setLoading(true);
    const { data, error: fetchError } = await tryCatch(getWork(id));
    if (fetchError || !data?.reference) {
      setError('Failed to fetch reference. Check the DOI and try again.');
    } else {
      setRefs((prev) => {
        if (prev.some((r) => r.id === data.reference!.id)) return prev;
        return [...prev, data.reference!].sort((a, b) =>
          (a.authors[0]?.family ?? '').localeCompare(b.authors[0]?.family ?? '')
        );
      });
    }
    setLoading(false);
  };

  const deleteRef = (index: number) =>
    setRefs((prev) => prev.filter((_, i) => i !== index));

  return (
    <ModalWrapper
      onClose={onClose}
      title="DOI Lookup"
      subtitle="Fetch and collect citations via Crossref"
      size="max-w-3xl">
      {/* Input */}
      <form onSubmit={onSubmit} class="flex gap-3">
        <input
          class="input input-bordered grow font-mono text-sm"
          value={doi()}
          onChange={(e) => setDoi((e.target as HTMLInputElement).value)}
          placeholder="https://doi.org/10.xxxx/..."
          required
        />
        <button
          type="submit"
          class="btn btn-primary min-w-[80px]"
          disabled={loading()}>
          {loading() ? (
            <span class="loading loading-spinner loading-sm" />
          ) : (
            'Fetch'
          )}
        </button>
      </form>

      {error() && <p class="text-error text-sm">{error()}</p>}

      {/* Tabs */}
      {refs().length > 0 && (
        <>
          <div class="tabs tabs-bordered">
            {(['references', 'table'] as const).map((t) => (
              <button
                key={t}
                class={`tab tab-bordered capitalize ${tab() === t ? 'tab-active' : ''}`}
                onClick={() => setTab(t)}>
                {t === 'references' ? `References (${refs().length})` : 'Table'}
              </button>
            ))}
          </div>

          {tab() === 'references' && (
            <div class="flex max-h-96 flex-col gap-3 overflow-y-auto">
              {refs().map((ref, i) => (
                <ReferenceCard
                  key={ref.id}
                  reference={ref}
                  onDelete={() => deleteRef(i)}
                />
              ))}
            </div>
          )}

          {tab() === 'table' && (
            <div class="max-h-96 overflow-y-auto">
              <ReferenceTable references={refs()} onDelete={deleteRef} />
            </div>
          )}
        </>
      )}

      {refs().length === 0 && !loading() && (
        <p class="text-base-content/30 py-6 text-center text-sm">
          No references yet — enter a DOI above to get started.
        </p>
      )}
    </ModalWrapper>
  );
};
