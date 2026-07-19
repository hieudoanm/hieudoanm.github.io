import { fireEvent, render, screen, within } from '@testing-library/react';
import { TaxesTemplate } from '../TaxesTemplate';

describe('TaxesTemplate', () => {
  it('renders regions with rates and the enabled summary', () => {
    render(<TaxesTemplate />);
    expect(screen.getByRole('heading', { name: 'Taxes' })).toBeInTheDocument();
    expect(screen.getByText('4 regions enabled')).toBeInTheDocument();
    expect(screen.getByText('California')).toBeInTheDocument();
    expect(screen.getByText('7.25%')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Enable California' })
    ).toBeChecked();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Enabled')).toHaveLength(4);
    expect(within(table).getAllByText('Disabled')).toHaveLength(2);
  });

  it('toggles regions between enabled and disabled', () => {
    render(<TaxesTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Enable Washington' })
    );
    expect(screen.getByText('5 regions enabled')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Disabled')).toHaveLength(1);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Enable California' })
    );
    expect(screen.getByText('4 regions enabled')).toBeInTheDocument();
    expect(within(table).getAllByText('Disabled')).toHaveLength(2);
  });

  it('renders the rate percentage for every region', () => {
    render(<TaxesTemplate />);
    expect(screen.getByText('8.875%')).toBeInTheDocument();
    expect(screen.getByText('6.5%')).toBeInTheDocument();
    expect(screen.getByText('6%')).toBeInTheDocument();
    expect(screen.getAllByText('6.25%')).toHaveLength(2);
  });
});
