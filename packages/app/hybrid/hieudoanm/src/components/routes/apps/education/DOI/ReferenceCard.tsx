import type { Reference } from '@api/ts';

export const ReferenceCard: React.FC<{
  reference: Reference;
  onDelete: () => void;
}> = ({ reference, onDelete }) => {
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
        <span className="font-normal">{authors}</span> ({reference.year}).{' '}
        <em>{reference.title}</em>. <em>{reference.journal}</em>. {journalPart}.
      </p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <a
          href={reference.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary truncate text-xs hover:underline">
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
ReferenceCard.displayName = 'ReferenceCard';
