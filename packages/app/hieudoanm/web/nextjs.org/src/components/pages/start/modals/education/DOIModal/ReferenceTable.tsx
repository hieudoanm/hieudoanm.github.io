import type { Reference } from '@api/ts';

export const ReferenceTable: React.FC<{
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
            <th key={h} className="text-base-content/60 font-normal">
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
                className="text-primary hover:underline">
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
ReferenceTable.displayName = 'ReferenceTable';
