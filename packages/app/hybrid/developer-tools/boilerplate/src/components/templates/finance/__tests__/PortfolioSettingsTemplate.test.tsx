import { fireEvent, render, screen } from '@testing-library/react';
import { PortfolioSettingsTemplate } from '../PortfolioSettingsTemplate';

describe('PortfolioSettingsTemplate', () => {
  it('renders the settings form fields', () => {
    render(<PortfolioSettingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Portfolio Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 preferences')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Growth Portfolio')).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Risk tolerance' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Currency' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Reinvest dividends' })
    ).not.toBeChecked();
  });

  it('toggles dividend reinvest and saves settings', () => {
    render(<PortfolioSettingsTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Reinvest dividends' })
    );
    expect(
      screen.getByRole('checkbox', { name: 'Reinvest dividends' })
    ).toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'Save settings' }));
    expect(
      screen.getByRole('button', { name: 'Settings saved' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Settings saved' }));
    expect(
      screen.getByRole('button', { name: 'Save settings' })
    ).toBeInTheDocument();
  });
});
