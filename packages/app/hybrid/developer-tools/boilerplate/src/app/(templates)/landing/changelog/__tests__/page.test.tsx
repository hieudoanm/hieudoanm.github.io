import { fireEvent, render, screen } from '@testing-library/react';
import ChangelogPage from '@/app/(templates)/landing/changelog/page';

describe('ChangelogPage', () => {
  it('renders releases and changes', () => {
    render(<ChangelogPage />);
    expect(screen.getByText("What's new")).toBeInTheDocument();
    expect(screen.getByText('v1.4.0')).toBeInTheDocument();
    expect(screen.getByText('v1.3.1')).toBeInTheDocument();
    expect(
      screen.getByText('Dark mode for the dashboard.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Fixed a crash when editing comments.')
    ).toBeInTheDocument();
  });

  it('filters changes by type', () => {
    render(<ChangelogPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Fixed' }));
    expect(
      screen.getByText('Fixed a crash when editing comments.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Dark mode for the dashboard.')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('v1.3.0')).not.toBeInTheDocument();
  });
});
