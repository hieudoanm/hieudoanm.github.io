import { render, screen, fireEvent } from '@testing-library/react';
import { TaxConfigPanel } from '../TaxConfigPanel';

const DEFAULT_CONFIG = { rate: 8.5, name: 'Sales Tax', enabled: true };

const renderComponent = (
  props: Partial<React.ComponentProps<typeof TaxConfigPanel>> = {}
) => {
  const defaultProps = {
    config: DEFAULT_CONFIG,
    onSave: jest.fn(),
    ...props,
  };
  return { ...render(<TaxConfigPanel {...defaultProps} />), ...defaultProps };
};

describe('TaxConfigPanel', () => {
  it('renders tax settings title', () => {
    renderComponent();
    expect(screen.getByText('Tax Settings')).toBeInTheDocument();
  });

  it('displays current config values', () => {
    renderComponent();
    expect(screen.getByText('Enable tax')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tax name')).toHaveValue('Sales Tax');
    expect(screen.getByPlaceholderText('Tax rate (%)')).toHaveValue(8.5);
  });

  it('disables inputs when tax is unchecked', () => {
    renderComponent({ config: { rate: 0, name: '', enabled: false } });
    expect(screen.getByPlaceholderText('Tax name')).toBeDisabled();
    expect(screen.getByPlaceholderText('Tax rate (%)')).toBeDisabled();
  });

  it('calls onSave with current values', () => {
    const { onSave } = renderComponent();
    fireEvent.change(screen.getByPlaceholderText('Tax name'), {
      target: { value: 'VAT' },
    });
    fireEvent.change(screen.getByPlaceholderText('Tax rate (%)'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByText('Save'));
    expect(onSave).toHaveBeenCalledWith({
      rate: 20,
      name: 'VAT',
      enabled: true,
    });
  });

  it('saves enabled=false when checkbox unchecked', () => {
    const { onSave } = renderComponent();
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByText('Save'));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false })
    );
  });
});
