'use client';

import { type FC, useMemo, useState } from 'react';
import { Providers } from '@/providers/gallery/Providers';
import { useData } from '@/providers/gallery/DataProvider';
import { PhoneFrame } from '@/components/gallery/organisms/PhoneFrame';
import { EmptyState } from '@/components/gallery/molecules/EmptyState';
import { PhotoTile } from '@/components/gallery/molecules/PhotoTile';
import { SearchBar } from '@/components/gallery/molecules/SearchBar';
import { allTags, filterPhotos } from '@/lib/gallery/selectors';

const SearchContent: FC = () => {
  const { photos, toggleFavorite } = useData();
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const tags = useMemo(() => allTags(photos), [photos]);

  const results = useMemo(() => {
    const matched = filterPhotos(photos, query);
    return tag ? matched.filter((p) => p.tags.includes(tag)) : matched;
  }, [photos, query, tag]);

  const active = query.trim().length > 0 || tag !== null;

  return (
    <PhoneFrame title="Search">
      <div className="space-y-4 p-4">
        <SearchBar value={query} onChange={setQuery} />

        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(tag === t ? null : t)}
              className={`badge badge-sm cursor-pointer ${
                tag === t ? 'badge-primary' : 'badge-ghost'
              }`}>
              #{t}
            </button>
          ))}
        </div>

        {active && (
          <p className="text-base-content/50 text-xs">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </p>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-3 gap-1">
            {results.map((photo) => (
              <PhotoTile
                key={photo.id}
                photo={photo}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No photos found"
            hint="Try a different name or tag"
          />
        )}
      </div>
    </PhoneFrame>
  );
};

const SearchPage: FC = () => (
  <Providers>
    <SearchContent />
  </Providers>
);

export default SearchPage;
