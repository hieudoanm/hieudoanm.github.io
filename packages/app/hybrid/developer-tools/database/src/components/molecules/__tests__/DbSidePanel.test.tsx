import { render, screen, fireEvent } from '@testing-library/react';

import { DbSidePanel } from '@/components/molecules/DbSidePanel';
import type { Bookmark, QueryHistory } from '@/types';

jest.mock('react-icons/fi', () => ({
  FiPlay: () => <span data-testid="ico-play" />,
  FiTrash2: () => <span data-testid="ico-trash" />,
  FiX: () => <span data-testid="ico-x" />,
}));

const history: QueryHistory[] = [
  {
    id: 'h1',
    connectionId: 'c1',
    sql: 'SELECT 1',
    executionTime: 4,
    rowCount: 1,
    success: true,
    timestamp: 1000,
  },
];

const bookmarks: [string, Bookmark[]][] = [
  [
    'work',
    [
      {
        id: 'b1',
        connectionId: 'c1',
        name: 'Top query',
        sql: 'SELECT 1',
        folder: 'work',
        createdAt: 1000,
      },
    ],
  ],
  [
    '',
    [
      {
        id: 'b2',
        connectionId: 'c1',
        name: 'Solo',
        sql: 'SELECT 2',
        folder: '',
        createdAt: 1000,
      },
    ],
  ],
];

describe('DbSidePanel', () => {
  it('renders nothing when no panel is open', () => {
    const { container } = render(
      <DbSidePanel
        panel={null}
        onClose={jest.fn()}
        history={[]}
        groupedBookmarks={[]}
        onRerun={jest.fn()}
        onUseSql={jest.fn()}
        onDeleteBookmark={jest.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows an empty history message', () => {
    render(
      <DbSidePanel
        panel="history"
        onClose={jest.fn()}
        history={[]}
        groupedBookmarks={[]}
        onRerun={jest.fn()}
        onUseSql={jest.fn()}
        onDeleteBookmark={jest.fn()}
      />
    );
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('No queries yet')).toBeInTheDocument();
  });

  it('lists history entries and supports rerun and reuse', () => {
    const onRerun = jest.fn();
    const onUseSql = jest.fn();
    render(
      <DbSidePanel
        panel="history"
        onClose={jest.fn()}
        history={history}
        groupedBookmarks={[]}
        onRerun={onRerun}
        onUseSql={onUseSql}
        onDeleteBookmark={jest.fn()}
      />
    );
    expect(screen.getByText('SELECT 1')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Re-run query'));
    expect(onRerun).toHaveBeenCalledWith('SELECT 1');
    fireEvent.click(screen.getByText('SELECT 1'));
    expect(onUseSql).toHaveBeenCalledWith('SELECT 1');
  });

  it('shows an empty bookmarks message', () => {
    render(
      <DbSidePanel
        panel="bookmarks"
        onClose={jest.fn()}
        history={[]}
        groupedBookmarks={[]}
        onRerun={jest.fn()}
        onUseSql={jest.fn()}
        onDeleteBookmark={jest.fn()}
      />
    );
    expect(screen.getByText('Bookmarks')).toBeInTheDocument();
    expect(screen.getByText('No bookmarks yet')).toBeInTheDocument();
  });

  it('lists grouped bookmarks, reuses, and deletes them', () => {
    const onDeleteBookmark = jest.fn();
    const onUseSql = jest.fn();
    render(
      <DbSidePanel
        panel="bookmarks"
        onClose={jest.fn()}
        history={[]}
        groupedBookmarks={bookmarks}
        onRerun={jest.fn()}
        onUseSql={onUseSql}
        onDeleteBookmark={onDeleteBookmark}
      />
    );
    expect(screen.getByText('work')).toBeInTheDocument();
    expect(screen.getByText('No folder')).toBeInTheDocument();
    expect(screen.getByText('Top query')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Top query'));
    expect(onUseSql).toHaveBeenCalledWith('SELECT 1');
    fireEvent.click(screen.getByLabelText('Delete bookmark Solo'));
    expect(onDeleteBookmark).toHaveBeenCalledWith('b2');
  });

  it('closes the panel', () => {
    const onClose = jest.fn();
    render(
      <DbSidePanel
        panel="bookmarks"
        onClose={onClose}
        history={[]}
        groupedBookmarks={bookmarks}
        onRerun={jest.fn()}
        onUseSql={jest.fn()}
        onDeleteBookmark={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Close panel'));
    expect(onClose).toHaveBeenCalled();
  });
});
