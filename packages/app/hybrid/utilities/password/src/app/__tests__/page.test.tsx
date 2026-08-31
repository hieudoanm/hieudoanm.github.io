import HomePage from '@/app/page';
import { mockDb } from '@/test-utils/fakeDb';
import type { VaultItem } from '@/types';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

jest.mock('@/lib/db', () => require('@/test-utils/fakeDb').mockDb);
jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(),
}));

const makeItem = (
  overrides: Partial<VaultItem> & { id: string; title: string }
): VaultItem => ({
  type: 'login',
  username: '',
  password: '',
  favorite: false,
  tags: [],
  createdAt: 1,
  updatedAt: 2,
  ...overrides,
});

const itemLinks = (): HTMLElement[] =>
  screen
    .getAllByRole('link')
    .filter((l) => l.getAttribute('href')?.startsWith('/item'));

const fireTouch = (el: HTMLElement, type: string, clientX: number) => {
  const event = new Event(type, { bubbles: true });
  const touches = [{ clientX }];
  Object.defineProperty(event, 'touches', {
    value: type === 'touchend' ? [] : touches,
  });
  Object.defineProperty(event, 'changedTouches', { value: touches });
  fireEvent(el, event);
};

describe('HomePage Phase 2 UX', () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    mockDb.reset();
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
  });

  it('focuses search with Ctrl+K', async () => {
    mockDb.reset({ items: [makeItem({ id: 'v-1', title: 'GitHub' })] });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByPlaceholderText('Search vault...')).toHaveFocus();
  });

  it('focuses search with Ctrl+L', async () => {
    mockDb.reset({ items: [makeItem({ id: 'v-1', title: 'GitHub' })] });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true });
    expect(screen.getByPlaceholderText('Search vault...')).toHaveFocus();
  });

  it('opens the new item modal with Ctrl+N', async () => {
    mockDb.reset({ items: [makeItem({ id: 'v-1', title: 'GitHub' })] });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.keyDown(window, { key: 'n', ctrlKey: true });
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  });

  it('supports Cmd+N too', async () => {
    mockDb.reset({ items: [makeItem({ id: 'v-1', title: 'GitHub' })] });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.keyDown(window, { key: 'N', metaKey: true });
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  });

  it('swipes an item left to reveal and confirm delete', async () => {
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'GitHub',
          username: 'user@gmail.com',
          password: 'Sup3r!Secret',
        }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());

    const card = screen.getByRole('link', { name: /GitHub/ });
    const deleteButton = screen.getByRole('button', {
      name: 'Delete GitHub',
    });
    expect(deleteButton.style.opacity).toBe('0');

    fireTouch(card, 'touchstart', 300);
    fireTouch(card, 'touchmove', 200);
    fireTouch(card, 'touchend', 200);

    expect(deleteButton.style.opacity).toBe('1');
    fireEvent.click(deleteButton);
    expect(
      screen.getByRole('heading', { name: 'Move item to trash?' })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', deletedAt: expect.any(Number) })
    );
    expect(screen.getByText('Moved to trash')).toBeInTheDocument();
  });

  it('resets swipe when released before the threshold', async () => {
    mockDb.reset({ items: [makeItem({ id: 'v-1', title: 'GitHub' })] });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    const card = screen.getByRole('link', { name: /GitHub/ });
    fireTouch(card, 'touchstart', 300);
    fireTouch(card, 'touchmove', 280);
    fireTouch(card, 'touchend', 280);
    expect(
      screen.getByRole('button', { name: 'Delete GitHub' }).style.opacity
    ).toBe('0');
  });

  it('cancels a revealed swipe and the delete dialog', async () => {
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'GitHub',
          username: 'user@gmail.com',
          password: 'Sup3r!Secret',
        }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    const card = screen.getByRole('link', { name: /GitHub/ });
    fireTouch(card, 'touchstart', 300);
    fireTouch(card, 'touchmove', 200);
    fireTouch(card, 'touchcancel', 0);
    expect(
      screen.getByRole('button', { name: 'Delete GitHub' }).style.opacity
    ).toBe('0');

    fireTouch(card, 'touchstart', 300);
    fireTouch(card, 'touchmove', 200);
    fireTouch(card, 'touchend', 200);
    fireEvent.click(screen.getByRole('button', { name: 'Delete GitHub' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(
      screen.queryByRole('heading', { name: 'Move item to trash?' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('copies a username from the card', async () => {
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'GitHub',
          username: 'user@gmail.com',
          password: 'Sup3r!Secret',
        }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    const copyButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(copyButtons[1]);
    await waitFor(() =>
      expect(screen.getByText('Username copied')).toBeInTheDocument()
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'user@gmail.com'
    );
  });

  it('drags an item onto a folder in the sidebar', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub' })],
      folders: [{ id: 'f1', name: 'Work', createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());

    const card = screen.getByRole('link', { name: /GitHub/ });
    const work = screen.getByRole('button', { name: 'Work' });
    const dataTransfer = { setData: jest.fn() };

    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(work);
    fireEvent.dragLeave(work);
    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(work);
    fireEvent.drop(work, { dataTransfer });
    fireEvent.dragEnd(card);

    await waitFor(() =>
      expect(mockDb.db.items.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'v-1', folderId: 'f1' })
      )
    );
    await waitFor(() =>
      expect(screen.getByText('Moved to Work')).toBeInTheDocument()
    );
  });

  it('shows a recently used section for items with a recent lastUsed', async () => {
    const now = Date.now();
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'GitHub',
          lastUsed: now - 3600000,
          updatedAt: 1,
        }),
        makeItem({ id: 'v-2', title: 'Visa 4242', type: 'card', updatedAt: 2 }),
      ],
    });
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByTestId('recently-used')).toBeInTheDocument()
    );
    const section = within(screen.getByTestId('recently-used'));
    expect(section.getByText('GitHub')).toBeInTheDocument();
    expect(section.queryByText('Visa 4242')).not.toBeInTheDocument();
  });

  it('hides recently used when a search is active', async () => {
    const now = Date.now();
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'GitHub',
          lastUsed: now - 3600000,
          updatedAt: 1,
        }),
      ],
    });
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByTestId('recently-used')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByPlaceholderText('Search vault...'), {
      target: { value: 'git' },
    });
    expect(screen.queryByTestId('recently-used')).not.toBeInTheDocument();
  });

  it('sorts by name via the dropdown', async () => {
    mockDb.reset({
      items: [
        makeItem({ id: 'v-2', title: 'Zebra', updatedAt: 200 }),
        makeItem({ id: 'v-1', title: 'Apple', updatedAt: 100 }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('Zebra')).toBeInTheDocument());
    expect(itemLinks()[0]).toHaveTextContent('Zebra');

    fireEvent.change(screen.getByLabelText('Sort items'), {
      target: { value: 'name' },
    });
    expect(itemLinks()[0]).toHaveTextContent('Apple');
  });

  it('sorts by most used', async () => {
    const now = Date.now();
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'Old Used',
          lastUsed: now - 86400000,
          updatedAt: 100,
        }),
        makeItem({
          id: 'v-2',
          title: 'Fresh Used',
          lastUsed: now - 1000,
          updatedAt: 200,
        }),
      ],
    });
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getAllByText('Fresh Used').length).toBeGreaterThan(0)
    );
    fireEvent.change(screen.getByLabelText('Sort items'), {
      target: { value: 'used' },
    });
    expect(itemLinks()[0]).toHaveTextContent('Fresh Used');
  });

  it('bulk selects and deletes items', async () => {
    mockDb.reset({
      items: [
        makeItem({ id: 'v-1', title: 'GitHub' }),
        makeItem({ id: 'v-2', title: 'Visa 4242', type: 'card' }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select GitHub' }));
    expect(screen.getByText('1 selected')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(
      screen.getByRole('heading', { name: 'Move selected items to trash?' })
    ).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);

    await waitFor(() =>
      expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
    );
    expect(screen.getByText('Visa 4242')).toBeInTheDocument();
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', deletedAt: expect.any(Number) })
    );
    expect(mockDb.db.items.put).not.toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-2', deletedAt: expect.any(Number) })
    );
    expect(screen.getByText('1 items moved to trash')).toBeInTheDocument();
  });

  it('exits select mode and clears the selection on Cancel', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub' })],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(
      screen.queryByRole('checkbox', { name: 'Select GitHub' })
    ).not.toBeInTheDocument();
  });

  it('selects all and clears the bulk selection', async () => {
    mockDb.reset({
      items: [
        makeItem({ id: 'v-1', title: 'GitHub' }),
        makeItem({ id: 'v-2', title: 'Visa 4242', type: 'card' }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.click(screen.getByRole('button', { name: 'Select all' }));
    expect(screen.getByText('2 selected')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByText('0 selected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });

  it('toggles selection by clicking the card body in select mode', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub' })],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.click(screen.getByRole('link', { name: /GitHub/ }));
    expect(screen.getByText('1 selected')).toBeInTheDocument();
  });

  it('cancels the bulk delete dialog without deleting', async () => {
    mockDb.reset({
      items: [
        makeItem({ id: 'v-1', title: 'GitHub' }),
        makeItem({ id: 'v-2', title: 'Visa 4242', type: 'card' }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select GitHub' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    const cancelButtons = screen.getAllByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButtons[cancelButtons.length - 1]);
    expect(
      screen.queryByRole('heading', { name: 'Move selected items to trash?' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Visa 4242')).toBeInTheDocument();
  });

  it('ignores shortcuts pressed without a modifier', async () => {
    mockDb.reset({ items: [makeItem({ id: 'v-1', title: 'GitHub' })] });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    const search = screen.getByPlaceholderText('Search vault...');
    fireEvent.keyDown(window, { key: 'k' });
    expect(search).not.toHaveFocus();
    fireEvent.keyDown(window, { key: 'p', ctrlKey: true });
    expect(screen.queryByPlaceholderText('Title')).not.toBeInTheDocument();
  });

  it('finds items by matching username in search', async () => {
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'GitHub',
          username: 'user@gmail.com',
        }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.change(screen.getByPlaceholderText('Search vault...'), {
      target: { value: 'user@gmail.com' },
    });
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('sorts by most used when some items have no lastUsed', async () => {
    const now = Date.now();
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'No usage',
          updatedAt: 100,
        }),
        makeItem({
          id: 'v-2',
          title: 'Recently used',
          lastUsed: now - 1000,
          updatedAt: 200,
        }),
      ],
    });
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getAllByText(/used/).length).toBeGreaterThan(0)
    );
    fireEvent.change(screen.getByLabelText('Sort items'), {
      target: { value: 'used' },
    });
    expect(itemLinks()[0]).toHaveTextContent('Recently used');
  });

  it('deselects an item by clicking its checkbox again', async () => {
    mockDb.reset({
      items: [
        makeItem({ id: 'v-1', title: 'GitHub' }),
        makeItem({ id: 'v-2', title: 'Visa 4242', type: 'card' }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    const checkbox = screen.getByRole('checkbox', { name: 'Select GitHub' });
    fireEvent.click(checkbox);
    expect(screen.getByText('1 selected')).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(screen.getByText('0 selected')).toBeInTheDocument();
  });

  it('does not move items on a drop without a drag', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub' })],
      folders: [{ id: 'f1', name: 'Work', createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    const work = screen.getByRole('button', { name: 'Work' });
    fireEvent.drop(work, { dataTransfer: { setData: jest.fn() } });
    expect(mockDb.db.items.put).not.toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', folderId: 'f1' })
    );
  });

  it('creates a folder via the folder manager', async () => {
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText('No folders')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Manage folders' }));
    fireEvent.change(screen.getByPlaceholderText('New folder name'), {
      target: { value: 'Work' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(mockDb.db.folders.put).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Work' })
      )
    );
    await waitFor(() =>
      expect(screen.getByText('Folder created')).toBeInTheDocument()
    );
  });

  it('renames a folder via the folder manager', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub' })],
      folders: [{ id: 'f1', name: 'Work', createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Manage folders' }));
    fireEvent.click(screen.getByRole('button', { name: 'Rename Work' }));
    fireEvent.change(screen.getByLabelText('Rename folder Work'), {
      target: { value: 'Work (2)' },
    });
    fireEvent.keyDown(screen.getByLabelText('Rename folder Work'), {
      key: 'Enter',
    });
    await waitFor(() =>
      expect(mockDb.db.folders.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'f1', name: 'Work (2)' })
      )
    );
  });

  it('deletes a folder via the folder manager', async () => {
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'GitHub',
          folderId: 'f1',
          username: '',
        }),
      ],
      folders: [{ id: 'f1', name: 'Work', createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Manage folders' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete folder Work' }));
    await waitFor(() =>
      expect(mockDb.db.folders.delete).toHaveBeenCalledWith('f1')
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', folderId: undefined })
    );
  });

  it('filters items by folder', async () => {
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'GitHub',
          folderId: 'f1',
          username: '',
        }),
        makeItem({ id: 'v-2', title: 'Visa 4242', type: 'card' }),
      ],
      folders: [{ id: 'f1', name: 'Work', createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText('Filter by folder'), {
      target: { value: 'f1' },
    });
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.queryByText('Visa 4242')).not.toBeInTheDocument();
  });

  it('filters items by tag', async () => {
    mockDb.reset({
      items: [
        makeItem({ id: 'v-1', title: 'GitHub', tags: ['dev'], username: '' }),
        makeItem({ id: 'v-2', title: 'Netflix', tags: ['personal'] }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText('Filter by tag'), {
      target: { value: 'dev' },
    });
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.queryByText('Netflix')).not.toBeInTheDocument();
  });

  it('filters items by date', async () => {
    const now = Date.now();
    mockDb.reset({
      items: [
        makeItem({ id: 'v-1', title: 'Recent', updatedAt: now - 86400000 }),
        makeItem({
          id: 'v-2',
          title: 'Ancient',
          updatedAt: now - 120 * 86400000,
        }),
      ],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('Recent')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText('Filter by date'), {
      target: { value: 'week' },
    });
    expect(screen.getByText('Recent')).toBeInTheDocument();
    expect(screen.queryByText('Ancient')).not.toBeInTheDocument();
  });

  it('adds custom fields when creating an item', async () => {
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText('No folders')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'My Site' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add field' }));
    const keys = screen.getAllByPlaceholderText('Key');
    const values = screen.getAllByPlaceholderText('Value');
    fireEvent.change(keys[0], { target: { value: 'PIN' } });
    fireEvent.change(values[0], { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add field' }));
    fireEvent.change(screen.getAllByPlaceholderText('Key')[1], {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(screen.getByText('Item created')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'My Site',
        customFields: [{ key: 'PIN', value: '1234' }],
      })
    );
  });

  it('removes a custom field before creating', async () => {
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText('No folders')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'My Site' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add field' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove custom field' })
    );
    expect(screen.queryByPlaceholderText('Key')).not.toBeInTheDocument();
  });

  it('resets the folder and tag filters to their defaults', async () => {
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'GitHub',
          folderId: 'f1',
          tags: ['dev'],
          username: '',
        }),
      ],
      folders: [{ id: 'f1', name: 'Work', createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText('Filter by folder'), {
      target: { value: 'f1' },
    });
    fireEvent.change(screen.getByLabelText('Filter by tag'), {
      target: { value: 'dev' },
    });
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Filter by folder'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText('Filter by tag'), {
      target: { value: '' },
    });
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('does not create a folder when the name is empty', async () => {
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText('No folders')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Manage folders' }));
    const input = screen.getByPlaceholderText('New folder name');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockDb.db.folders.put).not.toHaveBeenCalled();
  });

  it('creates a folder by pressing Enter', async () => {
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText('No folders')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Manage folders' }));
    fireEvent.change(screen.getByPlaceholderText('New folder name'), {
      target: { value: 'Work' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText('New folder name'), {
      key: 'Enter',
    });
    await waitFor(() =>
      expect(mockDb.db.folders.put).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Work' })
      )
    );
  });

  it('renames a folder by blurring with a non-empty value', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub' })],
      folders: [{ id: 'f1', name: 'Work', createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Manage folders' }));
    fireEvent.click(screen.getByRole('button', { name: 'Rename Work' }));
    fireEvent.change(screen.getByLabelText('Rename folder Work'), {
      target: { value: 'Work (3)' },
    });
    fireEvent.blur(screen.getByLabelText('Rename folder Work'));
    await waitFor(() =>
      expect(mockDb.db.folders.put).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Work (3)' })
      )
    );
  });

  it('discards an empty rename', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub' })],
      folders: [{ id: 'f1', name: 'Work', createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Manage folders' }));
    fireEvent.click(screen.getByRole('button', { name: 'Rename Work' }));
    fireEvent.change(screen.getByLabelText('Rename folder Work'), {
      target: { value: '   ' },
    });
    fireEvent.blur(screen.getByLabelText('Rename folder Work'));
    expect(mockDb.db.folders.put).not.toHaveBeenCalled();
  });

  it('filters to items shared with me', async () => {
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'Shared Vault',
          username: '',
          sharedBy: 'alice@example.com',
        }),
        makeItem({ id: 'v-2', title: 'Personal', username: '' }),
      ],
    });
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText('Personal')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Shared with me' }));
    expect(screen.getByText('Shared Vault')).toBeInTheDocument();
    expect(screen.queryByText('Personal')).not.toBeInTheDocument();
  });

  it('shows all items again when toggling the shared filter off', async () => {
    mockDb.reset({
      items: [
        makeItem({
          id: 'v-1',
          title: 'Shared Vault',
          username: '',
          sharedBy: 'alice@example.com',
        }),
        makeItem({ id: 'v-2', title: 'Personal', username: '' }),
      ],
    });
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText('Personal')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Shared with me' }));
    expect(screen.queryByText('Personal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Shared with me' }));
    expect(screen.getByText('Shared Vault')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
  });

  it('renders team vaults in the sidebar', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub', username: '' })],
      folders: [{ id: 'f1', name: 'Engineering', isTeam: true, createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    expect(screen.getByText('Team vaults')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Engineering/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
  });

  it('shows no team vaults placeholder when there are none', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub', username: '' })],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    expect(screen.getByText('No team vaults')).toBeInTheDocument();
  });

  it('creates a team folder via the folder manager', async () => {
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText('No folders')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Manage folders' }));
    fireEvent.change(screen.getByPlaceholderText('New folder name'), {
      target: { value: 'Eng' },
    });
    fireEvent.click(screen.getByLabelText('Create as team vault'));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(mockDb.db.folders.put).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Eng', isTeam: true })
      )
    );
  });

  it('toggles a folder as a team vault', async () => {
    mockDb.reset({
      items: [makeItem({ id: 'v-1', title: 'GitHub', username: '' })],
      folders: [{ id: 'f1', name: 'Work', createdAt: 1 }],
    });
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Manage folders' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Toggle team vault Work' })
    );
    await waitFor(() =>
      expect(mockDb.db.folders.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'f1', isTeam: true })
      )
    );
  });
});

describe('HomePage', () => {
  const items: VaultItem[] = [
    makeItem({
      id: 'v-1',
      title: 'GitHub',
      type: 'login',
      username: 'user@gmail.com',
      password: 'Sup3r!Secret',
      favorite: true,
      tags: ['dev'],
      updatedAt: 200,
    }),
    makeItem({
      id: 'v-2',
      title: 'Visa 4242',
      type: 'card',
      cardNumber: '4242424242424242',
      cardholder: 'John Doe',
      expiry: '12/28',
      tags: ['finance'],
      updatedAt: 100,
    }),
  ];

  beforeEach(() => {
    mockDb.reset({ items });
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  it('renders vault items after loading', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    expect(screen.getByText('Visa 4242')).toBeInTheDocument();
    expect(screen.getByText('user@gmail.com')).toBeInTheDocument();
    expect(screen.getAllByText('dev').length).toBeGreaterThan(0);
    expect(screen.getAllByText('finance').length).toBeGreaterThan(0);
  });

  it('shows a skeleton while loading', () => {
    mockDb.db.items.getAll.mockImplementationOnce(() => new Promise(() => {}));
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll('.skeleton').length).toBe(3);
  });

  it('filters items by search text', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.change(screen.getByPlaceholderText('Search vault...'), {
      target: { value: 'visa' },
    });
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
    expect(screen.getByText('Visa 4242')).toBeInTheDocument();
  });

  it('filters items by category chip', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Card' }));
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
    expect(screen.getByText('Visa 4242')).toBeInTheDocument();
  });

  it('shows empty state when nothing matches', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.change(screen.getByPlaceholderText('Search vault...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('copies a password and shows a toast', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    const copyButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(copyButtons[0]);
    await waitFor(() =>
      expect(screen.getByText('Password copied')).toBeInTheDocument()
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Sup3r!Secret');
  });

  it('creates a new item from the modal', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'My Site' },
    });
    fireEvent.change(screen.getByPlaceholderText('https://'), {
      target: { value: 'https://mysite.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'secret' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Toggle password visibility' })
    );
    fireEvent.change(screen.getByPlaceholderText('Notes'), {
      target: { value: 'hello' },
    });
    fireEvent.change(screen.getByPlaceholderText('Tags (comma separated)'), {
      target: { value: 'dev, test' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(screen.getByText('My Site')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalled();
    expect(screen.getByText('Item created')).toBeInTheDocument();
  });

  it('cancels the new item modal without creating', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByPlaceholderText('Title')).not.toBeInTheDocument();
  });

  it('shows type-specific fields in the new item form', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox', { name: 'Item type' }), {
      target: { value: 'card' },
    });
    expect(screen.getByPlaceholderText('Cardholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Card Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('CVV')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('https://')).not.toBeInTheDocument();
  });

  it('creates a card item with type-specific fields', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.change(screen.getByRole('combobox', { name: 'Item type' }), {
      target: { value: 'card' },
    });
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Visa Gold' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cardholder'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Card Number'), {
      target: { value: '4242424242424242' },
    });
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), {
      target: { value: '11/29' },
    });
    fireEvent.change(screen.getByPlaceholderText('CVV'), {
      target: { value: '999' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(screen.getByText('Visa Gold')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'card',
        cardNumber: '4242424242424242',
        cardholder: 'John Doe',
        expiry: '11/29',
        cvv: '999',
      })
    );
  });

  it('filters favorites from the sidebar', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Favorites' }));
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.queryByText('Visa 4242')).not.toBeInTheDocument();
  });
});
