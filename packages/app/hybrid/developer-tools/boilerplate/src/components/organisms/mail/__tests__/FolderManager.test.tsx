import { fireEvent, render, screen } from '@testing-library/react';
import { FolderManager } from '../FolderManager';

describe('FolderManager', () => {
  const folders = [
    { id: '1', name: 'Projects', count: 5 },
    { id: '2', name: 'Archive', count: 20 },
  ];

  it('renders folders with their counts', () => {
    render(<FolderManager folders={folders} />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('adds a new folder via onAdd', () => {
    const onAdd = jest.fn();
    render(<FolderManager folders={folders} onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText('New folder name'), {
      target: { value: 'Travel' },
    });
    fireEvent.click(screen.getByText('Add'));
    expect(onAdd).toHaveBeenCalledWith('Travel');
  });

  it('renames a folder via onRename', () => {
    const onRename = jest.fn();
    render(<FolderManager folders={folders} onRename={onRename} />);
    fireEvent.click(screen.getAllByText('Rename')[0]);
    fireEvent.change(screen.getByLabelText('Folder name'), {
      target: { value: 'Work' },
    });
    fireEvent.click(screen.getByText('Save'));
    expect(onRename).toHaveBeenCalledWith('1', 'Work');
  });

  it('deletes a folder via onDelete', () => {
    const onDelete = jest.fn();
    render(<FolderManager folders={folders} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
