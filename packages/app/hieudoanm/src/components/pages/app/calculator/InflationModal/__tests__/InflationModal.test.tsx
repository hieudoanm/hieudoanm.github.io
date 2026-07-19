import { fireEvent, render, screen } from '@testing-library/react';
import { InflationModal } from '../index';

describe('InflationModal', () => {
  it('renders with default Viet Nam country', () => {
    render(<InflationModal onClose={jest.fn()} />);
    expect(screen.getByText('Inflation Calculator')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Viet Nam')).toBeInTheDocument();
  });

  it('renders options tab by default', () => {
    const { container } = render(<InflationModal onClose={jest.fn()} />);
    expect(container.querySelector('.tab-active')).toHaveTextContent('Options');
  });

  it('switches to result tab', () => {
    render(<InflationModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Result'));
    expect(screen.getByText('Result').classList.contains('tab-active')).toBe(
      true
    );
  });

  it('shows inflation result when calculate is clicked', () => {
    render(<InflationModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Calculate →'));
    expect(screen.getByText(/Original/)).toBeInTheDocument();
    expect(screen.getByText(/Adjusted/)).toBeInTheDocument();
    expect(screen.getByText(/Cumulative/)).toBeInTheDocument();
    expect(screen.getByText(/Average\/yr/)).toBeInTheDocument();
    expect(screen.getByText(/Health/)).toBeInTheDocument();
  });

  it('changes country', () => {
    render(<InflationModal onClose={jest.fn()} />);
    const select = screen.getByDisplayValue('Viet Nam');
    fireEvent.change(select, { target: { value: 'United States' } });
    expect(screen.getByDisplayValue('United States')).toBeInTheDocument();
  });

  it('changes currency', () => {
    render(<InflationModal onClose={jest.fn()} />);
    const currencySelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(currencySelect, { target: { value: 'USD' } });
    expect(screen.getByDisplayValue('USD')).toBeInTheDocument();
  });

  it('changes amount', () => {
    render(<InflationModal onClose={jest.fn()} />);
    const input = screen.getByDisplayValue('1000000');
    fireEvent.change(input, { target: { value: '500000' } });
    expect(screen.getByDisplayValue('500000')).toBeInTheDocument();
  });

  it('does not set negative amount', () => {
    render(<InflationModal onClose={jest.fn()} />);
    const input = screen.getByDisplayValue('1000000');
    fireEvent.change(input, { target: { value: '-100' } });
    expect(screen.getByDisplayValue('1000000')).toBeInTheDocument();
  });

  it('renders all countries in select', () => {
    render(<InflationModal onClose={jest.fn()} />);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<InflationModal onClose={onClose} />);
    const closeButtons = screen.getAllByText('✕');
    fireEvent.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('switches from result back to options', () => {
    render(<InflationModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Calculate →'));
    fireEvent.click(screen.getByText('Options'));
    expect(screen.getByText('Options').classList.contains('tab-active')).toBe(
      true
    );
  });

  it('shows no data message when years are invalid', () => {
    render(<InflationModal onClose={jest.fn()} />);
    const yearSelects = screen.getAllByRole('combobox');
    const toSelect = yearSelects[3];
    const targetYear = (toSelect as HTMLSelectElement).value;
    const fromSelect = yearSelects[2];
    fireEvent.change(fromSelect, { target: { value: targetYear } });
    fireEvent.click(screen.getByText('Calculate →'));
    expect(screen.getByText(/No data available/)).toBeInTheDocument();
    const backBtn = screen.getByText('← Back to options');
    fireEvent.click(backBtn);
    expect(screen.getByText('Options').classList.contains('tab-active')).toBe(
      true
    );
  });
});
