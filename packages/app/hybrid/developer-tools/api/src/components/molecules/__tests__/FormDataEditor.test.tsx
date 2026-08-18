import { render, screen, fireEvent } from '@testing-library/react';
import { FormDataEditor } from '../FormDataEditor';

const rows = [
  { id: '1', key: 'field', value: 'value', enabled: true },
  { id: '2', key: 'upload', value: 'a.txt', enabled: true },
];

describe('FormDataEditor', () => {
  const onChange = jest.fn();
  const onFilesChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders rows with keys and values', () => {
    render(
      <FormDataEditor
        rows={rows}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    expect(screen.getByDisplayValue('field')).toBeInTheDocument();
    expect(screen.getByDisplayValue('value')).toBeInTheDocument();
  });

  it('adds a field', () => {
    render(
      <FormDataEditor
        rows={rows}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    fireEvent.click(screen.getByText('Add field'));
    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ key: '' })])
    );
  });

  it('toggles and removes rows', () => {
    render(
      <FormDataEditor
        rows={rows}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    fireEvent.click(screen.getAllByLabelText('Toggle row')[0]);
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: '1', enabled: false }),
      expect.objectContaining({ id: '2', enabled: true }),
    ]);

    fireEvent.click(screen.getAllByLabelText('Remove row')[0]);
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: '2' }),
    ]);
  });

  it('edits key and value', () => {
    render(
      <FormDataEditor
        rows={rows}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    fireEvent.change(screen.getByDisplayValue('value'), {
      target: { value: 'new' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: '1', value: 'new' }),
      expect.objectContaining({ id: '2' }),
    ]);
  });

  it('attaches a file and shows a badge', () => {
    const file = new File(['abc'], 'data.txt', { type: 'text/plain' });
    render(
      <FormDataEditor
        rows={rows}
        files={{ '1': file }}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    expect(screen.getByText('data.txt')).toBeInTheDocument();
  });

  it('registers a selected file', () => {
    const file = new File(['abc'], 'data.txt', { type: 'text/plain' });
    render(
      <FormDataEditor
        rows={rows}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    fireEvent.change(screen.getAllByLabelText('Attach file')[0], {
      target: { files: [file] },
    });
    expect(onFilesChange).toHaveBeenCalledWith({ '1': file });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: '1', value: 'data.txt' }),
      expect.objectContaining({ id: '2' }),
    ]);
  });

  it('removes a file via the badge', () => {
    const file = new File(['abc'], 'data.txt', { type: 'text/plain' });
    render(
      <FormDataEditor
        rows={rows}
        files={{ '1': file }}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Remove file'));
    expect(onFilesChange).toHaveBeenCalledWith({});
  });

  it('clears the file for a removed row', () => {
    const file = new File(['abc'], 'data.txt', { type: 'text/plain' });
    render(
      <FormDataEditor
        rows={rows}
        files={{ '1': file }}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    fireEvent.click(screen.getAllByLabelText('Remove row')[0]);
    expect(onFilesChange).toHaveBeenCalledWith({});
  });
});
