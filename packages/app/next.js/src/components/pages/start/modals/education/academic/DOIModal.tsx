// components/modals/DOIModal.tsx
import {
  getId,
  getWork,
  Reference,
} from '@hieudoanm/clients/crossref/crossref.client';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';
import { tryCatch } from '@hieudoanm/utils/try-catch';
import { ChangeEvent, FC, SubmitEvent, useState } from 'react';

const ReferenceCard: FC<{ reference: Reference; onDelete: () => void }> = ({
  reference,
  onDelete,
}) => {
  const authors = reference.authors
    .map((a) => `${a.family}, ${a.given.charAt(0)}.`)
    .join(', ')
    .replace(/, ([^,]*)$/, ', & $1');

  const journalPart = `${reference.volume}${
    reference.issue ? `(${reference.issue})` : ''
  }, ${reference.pages}`;

  return (
    <div className="border-base-300 bg-base-200 rounded-lg border p-4 text-sm">
      <p className="text-base-content">
        <span className="font-medium">{authors}</span> ({reference.year}).{' '}
        <em>{reference.title}</em>. <em>{reference.journal}</em>. {journalPart}.
      </p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <a
          href={reference.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-info truncate text-xs hover:underline">
          {reference.url}
        </a>
        <button
          className="btn btn-ghost btn-xs text-error shrink-0"
          onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

const ReferenceTable: FC<{
  references: Reference[];
  onDelete: (index: number) => void;
}> = ({ references, onDelete }) => (
  <div className="border-base-300 overflow-x-auto rounded-lg border">
    <table className="table-sm table w-full">
      <thead className="bg-base-200">
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
            <th key={h} className="text-base-content/60 font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {references.map((ref, i) => (
          <tr key={`${ref.id}-${i}`} className="hover:bg-base-200/50">
            <td className="max-w-[140px] truncate">
              {ref.authors.map((a) => `${a.family} ${a.given}`).join(', ')}
            </td>
            <td>{ref.year}</td>
            <td className="max-w-[180px] truncate">{ref.title}</td>
            <td className="max-w-[120px] truncate italic">{ref.journal}</td>
            <td>
              {ref.volume}
              {ref.issue ? `(${ref.issue})` : ''}, {ref.pages}
            </td>
            <td>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-info hover:underline">
                View
              </a>
            </td>
            <td>
              <button
                className="btn btn-ghost btn-xs text-error"
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

export const DOIModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [doi, setDoi] = useState('https://doi.org/10.1016/j.smrv.2009.04.001');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'references' | 'table'>('references');
  const [refs, setRefs] = useState<Reference[]>([]);

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError('');
    const id = getId(doi);
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
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          className="input input-bordered grow font-mono text-sm"
          value={doi}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDoi(e.target.value)
          }
          placeholder="https://doi.org/10.xxxx/..."
          required
        />
        <button
          type="submit"
          className="btn btn-primary min-w-[80px]"
          disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            'Fetch'
          )}
        </button>
      </form>

      {error && <p className="text-error text-sm">{error}</p>}

      {/* Tabs */}
      {refs.length > 0 && (
        <>
          <div className="tabs tabs-bordered">
            {(['references', 'table'] as const).map((t) => (
              <button
                key={t}
                className={`tab tab-bordered capitalize ${tab === t ? 'tab-active' : ''}`}
                onClick={() => setTab(t)}>
                {t === 'references' ? `References (${refs.length})` : 'Table'}
              </button>
            ))}
          </div>

          {tab === 'references' && (
            <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
              {refs.map((ref, i) => (
                <ReferenceCard
                  key={ref.id}
                  reference={ref}
                  onDelete={() => deleteRef(i)}
                />
              ))}
            </div>
          )}

          {tab === 'table' && (
            <div className="max-h-96 overflow-y-auto">
              <ReferenceTable references={refs} onDelete={deleteRef} />
            </div>
          )}
        </>
      )}

      {refs.length === 0 && !loading && (
        <p className="text-base-content/30 py-6 text-center text-sm">
          No references yet — enter a DOI above to get started.
        </p>
      )}
    </ModalWrapper>
  );
};
