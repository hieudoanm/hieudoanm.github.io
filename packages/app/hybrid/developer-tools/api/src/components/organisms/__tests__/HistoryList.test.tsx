import { render, screen, fireEvent } from '@testing-library/react';
import { emptyRequest } from '@/lib/http';
import { HistoryEntry } from '@/types/api-client';
import { HistoryList } from '../HistoryList';

const entry: HistoryEntry = {
  id: '1',
  timestamp: Date.now() - 5 * 60000,
  request: { ...emptyRequest(), url: 'https://api.example.com/users' },
};

describe('HistoryList', () => {
  const onSelect = jest.fn();
  const onClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state', () => {
    render(
      <HistoryList
        entries={[]}
        activeId={null}
        onSelect={onSelect}
        onClear={onClear}
      />
    );
    expect(screen.getByText('No requests yet')).toBeInTheDocument();
  });

  it('renders entries with method, url and relative time', () => {
    render(
      <HistoryList
        entries={[entry]}
        activeId={null}
        onSelect={onSelect}
        onClear={onClear}
      />
    );
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(
      screen.getByText('https://api.example.com/users')
    ).toBeInTheDocument();
    expect(screen.getByText('5m ago')).toBeInTheDocument();
  });

  it('selects an entry', () => {
    render(
      <HistoryList
        entries={[entry]}
        activeId={null}
        onSelect={onSelect}
        onClear={onClear}
      />
    );
    fireEvent.click(screen.getByText('https://api.example.com/users'));
    expect(onSelect).toHaveBeenCalledWith(entry);
  });

  it('clears history', () => {
    render(
      <HistoryList
        entries={[entry]}
        activeId={null}
        onSelect={onSelect}
        onClear={onClear}
      />
    );
    fireEvent.click(screen.getByText('Clear'));
    expect(onClear).toHaveBeenCalled();
  });

  it('filters entries by query', () => {
    const other = {
      ...entry,
      id: '2',
      request: { ...emptyRequest(), url: 'https://api.example.com/posts' },
    };
    render(
      <HistoryList
        entries={[entry, other]}
        activeId={null}
        onSelect={onSelect}
        onClear={onClear}
      />
    );
    fireEvent.change(screen.getByLabelText('Search history'), {
      target: { value: 'posts' },
    });
    expect(
      screen.getByText('https://api.example.com/posts')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('https://api.example.com/users')
    ).not.toBeInTheDocument();
  });

  it('shows a message when nothing matches', () => {
    render(
      <HistoryList
        entries={[entry]}
        activeId={null}
        onSelect={onSelect}
        onClear={onClear}
      />
    );
    fireEvent.change(screen.getByLabelText('Search history'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No matching requests')).toBeInTheDocument();
  });

  it('does not show the search box when empty', () => {
    render(
      <HistoryList
        entries={[]}
        activeId={null}
        onSelect={onSelect}
        onClear={onClear}
      />
    );
    expect(screen.queryByLabelText('Search history')).not.toBeInTheDocument();
  });
});
