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
});
