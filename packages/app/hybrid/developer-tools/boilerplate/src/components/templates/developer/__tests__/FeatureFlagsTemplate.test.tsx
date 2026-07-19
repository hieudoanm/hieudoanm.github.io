import { fireEvent, render, screen, within } from '@testing-library/react';
import { FeatureFlagsTemplate } from '../FeatureFlagsTemplate';

describe('FeatureFlagsTemplate', () => {
  it('renders flags with per-environment checkboxes', () => {
    render(<FeatureFlagsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Feature Flags' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('9 flags enabled across environments')
    ).toBeInTheDocument();
    expect(screen.getByText('new-checkout')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', {
        name: 'Enable new-checkout in Production',
      })
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', {
        name: 'Enable kill-switch-imports in Development',
      })
    ).not.toBeChecked();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('In production')).toHaveLength(2);
    expect(within(table).getAllByText('Staged')).toHaveLength(3);
  });

  it('toggles a flag across environments', () => {
    render(<FeatureFlagsTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Enable dark-mode-2 in Production' })
    );
    expect(
      screen.getByText('10 flags enabled across environments')
    ).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('In production')).toHaveLength(3);
  });

  it('disables flags and recomputes the summary', () => {
    render(<FeatureFlagsTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Enable instant-search in Staging' })
    );
    expect(
      screen.getByText('8 flags enabled across environments')
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: 'Enable new-checkout in Development',
      })
    );
    expect(
      screen.getByText('7 flags enabled across environments')
    ).toBeInTheDocument();
  });
});
