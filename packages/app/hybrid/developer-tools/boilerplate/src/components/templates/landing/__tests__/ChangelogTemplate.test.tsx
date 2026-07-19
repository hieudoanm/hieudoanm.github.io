import { fireEvent, render, screen } from '@testing-library/react';
import { ChangelogTemplate } from '../ChangelogTemplate';

describe('ChangelogTemplate', () => {
  it('renders the heading and release entries', () => {
    render(<ChangelogTemplate />);
    expect(
      screen.getByRole('heading', { name: "What's new" })
    ).toBeInTheDocument();
    expect(screen.getByText('v1.4.0')).toBeInTheDocument();
    expect(screen.getByText('v1.3.1')).toBeInTheDocument();
    expect(
      screen.getByText('Dark mode for the dashboard.')
    ).toBeInTheDocument();
  });

  it('filters releases by change type', () => {
    render(<ChangelogTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Fixed' }));
    expect(screen.getByText('v1.3.1')).toBeInTheDocument();
    expect(
      screen.queryByText('Export reports to CSV.')
    ).not.toBeInTheDocument();
  });
});
