import { render, screen, fireEvent } from '@testing-library/react';
import { KeyValueEditor } from '../KeyValueEditor';

const rows = [{ id: '1', key: 'X-Test', value: 'yes', enabled: true }];

describe('KeyValueEditor', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders rows with keys and values', () => {
    render(
      <KeyValueEditor rows={rows} onChange={onChange} ariaLabel="Header" />
    );
    expect(screen.getByLabelText('Header key')).toHaveValue('X-Test');
    expect(screen.getByLabelText('Header value')).toHaveValue('yes');
  });

  it('adds a row', () => {
    render(
      <KeyValueEditor
        rows={rows}
        onChange={onChange}
        ariaLabel="Query parameter"
      />
    );
    fireEvent.click(screen.getByText('Add row'));
    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ key: '' })])
    );
  });

  it('toggles enabled state', () => {
    render(
      <KeyValueEditor rows={rows} onChange={onChange} ariaLabel="Header" />
    );
    fireEvent.click(screen.getByLabelText('Toggle row'));
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: '1', enabled: false }),
    ]);
  });

  it('removes a row', () => {
    render(
      <KeyValueEditor rows={rows} onChange={onChange} ariaLabel="Header" />
    );
    fireEvent.click(screen.getByLabelText('Remove row'));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('edits key and value', () => {
    render(
      <KeyValueEditor rows={rows} onChange={onChange} ariaLabel="Header" />
    );
    fireEvent.change(screen.getByLabelText('Header key'), {
      target: { value: 'X-New' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ key: 'X-New' }),
    ]);
  });

  it('updates only the matching row when there are several', () => {
    const twoRows = [
      { id: '1', key: 'a', value: '1', enabled: true },
      { id: '2', key: 'b', value: '2', enabled: true },
    ];
    render(
      <KeyValueEditor rows={twoRows} onChange={onChange} ariaLabel="Header" />
    );
    fireEvent.change(screen.getAllByLabelText('Header value')[0], {
      target: { value: '10' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: '1', value: '10' }),
      expect.objectContaining({ id: '2', value: '2' }),
    ]);
  });
});
