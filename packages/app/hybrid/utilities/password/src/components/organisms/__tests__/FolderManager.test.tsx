import { render, screen, fireEvent } from '@testing-library/react';
import { FolderManager } from '@/components/organisms/FolderManager';
import type { Folder } from '@/types';

const folders: Folder[] = [
  { id: 'f-1', name: 'Work', isTeam: false, createdAt: 1 },
  { id: 'f-2', name: 'Shared', isTeam: true, createdAt: 2 },
];

const defaults = {
  folders,
  onCreate: jest.fn(),
  onRename: jest.fn(),
  onDelete: jest.fn(),
  onToggleTeam: jest.fn(),
  onClose: jest.fn(),
};

const renderManager = (overrides: Partial<typeof defaults> = {}) =>
  render(<FolderManager {...defaults} {...overrides} />);

describe('FolderManager', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders the dialog title', () => {
    renderManager();
    expect(screen.getByText('Manage Folders')).toBeInTheDocument();
  });

  it('shows empty state when no folders', () => {
    renderManager({ folders: [] });
    expect(screen.getByText('No folders yet')).toBeInTheDocument();
  });

  it('creates a folder on button click', () => {
    renderManager();
    fireEvent.change(screen.getByPlaceholderText('New folder name'), {
      target: { value: 'New' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(defaults.onCreate).toHaveBeenCalledWith('New', false);
  });

  it('does not create a folder with empty name', () => {
    renderManager();
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(defaults.onCreate).not.toHaveBeenCalled();
  });

  it('creates a team folder when checkbox is checked', () => {
    renderManager();
    fireEvent.change(screen.getByPlaceholderText('New folder name'), {
      target: { value: 'Team Vault' },
    });
    fireEvent.click(
      screen.getByRole('checkbox', { name: /Create as team vault/ })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(defaults.onCreate).toHaveBeenCalledWith('Team Vault', true);
  });

  it('creates folder on Enter key', () => {
    renderManager();
    const input = screen.getByPlaceholderText('New folder name');
    fireEvent.change(input, { target: { value: 'Enter Folder' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(defaults.onCreate).toHaveBeenCalledWith('Enter Folder', false);
  });

  it('deletes a folder', () => {
    renderManager();
    fireEvent.click(screen.getByRole('button', { name: 'Delete folder Work' }));
    expect(defaults.onDelete).toHaveBeenCalledWith('f-1');
  });

  it('toggles team status', () => {
    renderManager();
    fireEvent.click(
      screen.getByRole('button', { name: 'Toggle team vault Work' })
    );
    expect(defaults.onToggleTeam).toHaveBeenCalledWith('f-1');
  });

  it('starts and submits rename', () => {
    renderManager();
    fireEvent.click(screen.getByRole('button', { name: 'Rename Work' }));
    const input = screen.getByLabelText('Rename folder Work');
    fireEvent.change(input, { target: { value: 'Home' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(defaults.onRename).toHaveBeenCalledWith('f-1', 'Home');
  });

  it('submits rename on blur', () => {
    renderManager();
    fireEvent.click(screen.getByRole('button', { name: 'Rename Work' }));
    const input = screen.getByLabelText('Rename folder Work');
    fireEvent.change(input, { target: { value: 'Office' } });
    fireEvent.blur(input);
    expect(defaults.onRename).toHaveBeenCalledWith('f-1', 'Office');
  });

  it('does not rename with empty name', () => {
    renderManager();
    fireEvent.click(screen.getByRole('button', { name: 'Rename Work' }));
    const input = screen.getByLabelText('Rename folder Work');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(defaults.onRename).not.toHaveBeenCalled();
  });

  it('closes the dialog', () => {
    renderManager();
    fireEvent.click(
      screen.getByRole('button', { name: 'Close folder manager' })
    );
    expect(defaults.onClose).toHaveBeenCalled();
  });

  it('displays team badge for team folders', () => {
    renderManager();
    expect(screen.getByText('Team')).toBeInTheDocument();
  });
});
