import { fireEvent, render, screen } from '@testing-library/react';
import { TransferList } from '../TransferList';

describe('TransferList', () => {
  const left = [
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
  ];
  const right = [{ id: 'c', label: 'Gamma' }];

  it('renders both columns with their titles', () => {
    render(<TransferList left={left} right={right} onChange={jest.fn()} />);
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Selected')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('moves a selected item to the right column', () => {
    const onChange = jest.fn();
    render(<TransferList left={left} right={[]} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Alpha'));
    fireEvent.click(screen.getByText('→'));
    expect(onChange).toHaveBeenCalledWith(
      [{ id: 'b', label: 'Beta' }],
      [{ id: 'a', label: 'Alpha' }]
    );
  });

  it('moves all items to the right column', () => {
    const onChange = jest.fn();
    render(<TransferList left={left} right={[]} onChange={onChange} />);
    fireEvent.click(screen.getByText('»'));
    expect(onChange).toHaveBeenCalledWith([], left);
  });

  it('moves a selected item to the left column', () => {
    const onChange = jest.fn();
    render(<TransferList left={[]} right={right} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Gamma'));
    fireEvent.click(screen.getByText('←'));
    expect(onChange).toHaveBeenCalledWith([{ id: 'c', label: 'Gamma' }], []);
  });

  it('moves all items to the left column', () => {
    const onChange = jest.fn();
    render(<TransferList left={[]} right={right} onChange={onChange} />);
    fireEvent.click(screen.getByText('«'));
    expect(onChange).toHaveBeenCalledWith([{ id: 'c', label: 'Gamma' }], []);
  });

  it('disables move buttons when nothing is selected', () => {
    render(<TransferList left={left} right={right} onChange={jest.fn()} />);
    expect(screen.getByText('→')).toBeDisabled();
    expect(screen.getByText('←')).toBeDisabled();
  });

  it('does not call onChange when moving with no selection', () => {
    const onChange = jest.fn();
    render(<TransferList left={left} right={right} onChange={onChange} />);
    fireEvent.click(screen.getByText('→'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows an empty state for empty columns', () => {
    render(<TransferList left={[]} right={[]} onChange={jest.fn()} />);
    expect(screen.getAllByText('No items')).toHaveLength(2);
  });
});
