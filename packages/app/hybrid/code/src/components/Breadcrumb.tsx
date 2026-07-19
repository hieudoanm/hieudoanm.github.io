import { type FC } from 'react';

interface BreadcrumbProps {
  rootPath: string | null;
  filePath: string;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ rootPath, filePath }) => {
  const segments = filePath.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  return (
    <div className="bg-base-200 border-base-100 flex items-center gap-1 border-b px-3 py-0.5 text-xs">
      {rootPath && (
        <>
          <span className="text-base-content/40 max-w-48 truncate">
            {rootPath.split('/').findLast(Boolean) ?? rootPath}
          </span>
          <span className="text-base-content/30">/</span>
        </>
      )}
      {segments.map((seg, i) => (
        <span key={`${seg}-${i}`} className="flex items-center gap-1">
          {i > 0 && <span className="text-base-content/30">/</span>}
          <span
            className={
              i === segments.length - 1
                ? 'text-base-content/80'
                : 'text-base-content/40'
            }>
            {seg}
          </span>
        </span>
      ))}
    </div>
  );
};
