import { render, screen, fireEvent } from '@testing-library/react';

import { Tax } from '../index';

describe('Tax', () => {
  it('renders the input tab by default', () => {
    render(<Tax onClose={jest.fn()} />);
    expect(screen.getByRole('tab', { name: 'Input' })).toBeInTheDocument();
    expect(screen.getByLabelText('Thu nhap')).toBeInTheDocument();
  });

  it('switches to the results tab and shows net pay', () => {
    render(<Tax onClose={jest.fn()} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Results' }));
    expect(screen.getByText('Thuc linh:')).toBeInTheDocument();
    expect(screen.getByText('Khau tru')).toBeInTheDocument();
  });

  it('returns to the input tab from results', () => {
    render(<Tax onClose={jest.fn()} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Results' }));
    fireEvent.click(screen.getByRole('button', { name: /back to input/i }));
    expect(screen.getByLabelText('Thu nhap')).toBeInTheDocument();
  });

  it('toggles salary mode between gross and net', () => {
    render(<Tax onClose={jest.fn()} />);
    expect(screen.getByText('Thu nhap gop (Gross)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Gross → Net' }));
    expect(screen.getByText('Thu nhap thuc linh (Net)')).toBeInTheDocument();
  });

  it('switches the tax period', () => {
    render(<Tax onClose={jest.fn()} />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'annual' },
    });
    expect(screen.getByText('Thu nhap gop (Gross)')).toBeInTheDocument();
  });

  it('accepts dependent input', () => {
    render(<Tax onClose={jest.fn()} />);
    fireEvent.change(screen.getByLabelText('Nguoi phu thuoc'), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByRole('tab', { name: 'Results' }));
    expect(screen.getByText('Phu thuoc:')).toBeInTheDocument();
  });

  it('toggles the insurance switch', () => {
    render(<Tax onClose={jest.fn()} />);
    const toggle = screen.getByLabelText('Tinh bao hiem');
    expect(toggle).toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it('calls onClose when close is pressed', () => {
    const onClose = jest.fn();
    render(<Tax onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows the insurance cap note for high income', () => {
    render(<Tax onClose={jest.fn()} />);
    fireEvent.change(screen.getByLabelText('Thu nhap'), {
      target: { value: '80000000' },
    });
    fireEvent.click(screen.getByRole('tab', { name: 'Results' }));
    expect(screen.getByText('Ap dung truong bao hiem')).toBeInTheDocument();
  });

  it('renders a tax breakdown table row per bracket', () => {
    render(<Tax onClose={jest.fn()} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Results' }));
    expect(screen.getByText('Chi tiet thue')).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
  });
});
