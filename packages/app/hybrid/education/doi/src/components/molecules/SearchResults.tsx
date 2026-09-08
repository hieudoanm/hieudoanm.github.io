import { FC } from 'react';

import SearchResultItem from '@/components/atoms/SearchResultItem';
import type { Work } from '@/types/doi';

interface SearchResultsProps {
  query: string;
  results: Work[];
}

const SearchResults: FC<SearchResultsProps> = ({ query, results }) => {
  if (query === '') {
    return (
      <p className="text-base-content/50 text-sm">
        Type a query to search the citation network.
      </p>
    );
  }
  if (results.length === 0) {
    return (
      <p className="text-base-content/50 py-8 text-center">
        No works match &quot;{query}&quot;.
      </p>
    );
  }
  return (
    <ul className="space-y-3" data-testid="search-results">
      {results.map((work) => (
        <SearchResultItem key={work.doi} work={work} />
      ))}
    </ul>
  );
};

export default SearchResults;
