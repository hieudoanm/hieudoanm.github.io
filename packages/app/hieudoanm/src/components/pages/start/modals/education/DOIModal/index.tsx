import { getId, getWork } from '@api/ts';
import type { Reference } from '@api/ts';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { tryCatch } from '@lodashx/ts';
import { ChangeEvent, FC, SubmitEvent, useState } from 'react';

import { ReferenceCard } from './ReferenceCard';
import { ReferenceTable } from './ReferenceTable';

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
DOIModal.displayName = 'DOIModal';
