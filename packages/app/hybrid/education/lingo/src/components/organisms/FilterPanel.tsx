import { FC, useState } from 'react';
import { CaretButton } from '@/components/atoms/CaretButton';
import { FilterChip } from '@/components/atoms/FilterChip';
import { FilterCheckbox } from '@/components/molecules/FilterCheckbox';
import { FilterRow } from '@/components/molecules/FilterRow';
import { SearchBar } from '@/components/molecules/SearchBar';
import { SelectField } from '@/components/molecules/SelectField';
import type { DifficultyFilter, GroupBy, SortOrder } from '@/lib/catalog';

export interface FilterPanelProps {
  query: string;
  onQueryChange: (value: string) => void;
  categories: string[];
  category: string;
  onCategoryChange: (value: string) => void;
  difficulty: DifficultyFilter;
  onDifficultyChange: (value: DifficultyFilter) => void;
  sort: SortOrder;
  onSortChange: (value: SortOrder) => void;
  groupBy: GroupBy;
  onGroupByChange: (value: GroupBy) => void;
  nobelOnly: boolean;
  onNobelChange: (value: boolean) => void;
}

const DIFFICULTY_LABELS: readonly DifficultyFilter[] = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'default', label: 'Default order' },
  { value: 'label-asc', label: 'Title: A → Z' },
  { value: 'label-desc', label: 'Title: Z → A' },
  { value: 'category', label: 'Category' },
  { value: 'easiest', label: 'Difficulty: Easiest first' },
  { value: 'hardest', label: 'Difficulty: Hardest first' },
];

const GROUP_OPTIONS: { value: string; label: string }[] = [
  { value: 'difficulty', label: 'By difficulty' },
  { value: 'category', label: 'By category' },
  { value: 'letter', label: 'By first letter' },
];

export const FilterPanel: FC<FilterPanelProps> = ({
  query,
  onQueryChange,
  categories,
  category,
  onCategoryChange,
  difficulty,
  onDifficultyChange,
  sort,
  onSortChange,
  groupBy,
  onGroupByChange,
  nobelOnly,
  onNobelChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="card border-base-content/10 w-full max-w-3xl border">
      <div className="card-body gap-4 p-5">
        <SearchBar value={query} onChange={onQueryChange} />
        <CaretButton
          open={showAdvanced}
          onClick={() => setShowAdvanced((prev) => !prev)}
          label="Advanced"
        />
        {showAdvanced && (
          <div className="flex flex-col gap-3">
            <FilterRow label="Category">
              {categories.map((cat) => (
                <FilterChip
                  key={cat}
                  label={cat}
                  active={category === cat}
                  onClick={() => onCategoryChange(cat)}
                  testid={`category-${cat}`}
                />
              ))}
            </FilterRow>
            <FilterRow label="Difficulty">
              {DIFFICULTY_LABELS.map((lvl) => (
                <FilterChip
                  key={lvl}
                  label={lvl}
                  active={difficulty === lvl}
                  onClick={() => onDifficultyChange(lvl)}
                  testid={`difficulty-${lvl}`}
                />
              ))}
            </FilterRow>
            <SortAndGroupFields
              sort={sort}
              onSortChange={onSortChange}
              groupBy={groupBy}
              onGroupByChange={onGroupByChange}
            />
            <FilterRow label="More">
              <FilterCheckbox
                checked={nobelOnly}
                onChange={onNobelChange}
                label="Nobel Prize winners only"
              />
            </FilterRow>
          </div>
        )}
      </div>
    </div>
  );
};

const SortAndGroupFields: FC<{
  sort: SortOrder;
  onSortChange: (value: SortOrder) => void;
  groupBy: GroupBy;
  onGroupByChange: (value: GroupBy) => void;
}> = ({ sort, onSortChange, groupBy, onGroupByChange }) => (
  <>
    <SelectField
      label="Sort"
      value={sort}
      onChange={(value) => onSortChange(value as SortOrder)}
      ariaLabel="Sort theories"
      testid="sort-select">
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectField>
    <SelectField
      label="Group"
      value={groupBy}
      onChange={(value) => onGroupByChange(value as GroupBy)}
      ariaLabel="Group theories"
      testid="group-select">
      {GROUP_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectField>
  </>
);

SortAndGroupFields.displayName = 'SortAndGroupFields';

FilterPanel.displayName = 'FilterPanel';
