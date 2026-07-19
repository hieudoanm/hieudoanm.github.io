import { render, screen, fireEvent } from '@testing-library/react';
import { HistoryEntryItem } from '../HistoryEntryItem';
import { emptyRequest } from '@/lib/http';
import { HistoryEntry } from '@/types/api-client';

const entry: HistoryEntry = {
  id: 'h1',
  timestamp: Date.now(),
  request: { ...emptyRequest(), url: 'https://api.example.com/users' },
};

describe('HistoryEntryItem', () => {
  const onSelect = jest.fn();

  it('selects the entry on click', () => {
    render(<HistoryEntryItem entry={entry} active onSelect={onSelect} />);
    fireEvent.click(screen.getByText('https://api.example.com/users'));
    expect(onSelect).toHaveBeenCalledWith(entry);
  });

  it('marks the entry as active', () => {
    render(<HistoryEntryItem entry={entry} active onSelect={onSelect} />);
    expect(screen.getByRole('button').className).toContain('menu-active');
  });

  it('renders inactive entries without the active class', () => {
    render(
      <HistoryEntryItem entry={entry} active={false} onSelect={onSelect} />
    );
    expect(screen.getByRole('button').className).not.toContain('menu-active');
  });
});
