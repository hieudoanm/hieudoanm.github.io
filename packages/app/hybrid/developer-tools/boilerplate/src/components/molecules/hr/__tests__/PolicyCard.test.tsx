import { render, screen } from '@testing-library/react';
import { PolicyCard } from '../PolicyCard';

const policy = {
  title: 'Remote Work Policy',
  summary: 'Guidelines for working remotely.',
  version: '3.1',
  updatedAt: 'Jul 15',
  category: 'Workplace',
};

describe('PolicyCard', () => {
  it('renders policy details', () => {
    render(<PolicyCard {...policy} />);
    expect(screen.getByText('Remote Work Policy')).toBeInTheDocument();
    expect(
      screen.getByText('Guidelines for working remotely.')
    ).toBeInTheDocument();
    expect(screen.getByText('Workplace')).toBeInTheDocument();
    expect(screen.getByText('v3.1')).toBeInTheDocument();
    expect(screen.getByText('Updated Jul 15')).toBeInTheDocument();
  });

  it('shows Latest when version is omitted', () => {
    render(<PolicyCard {...policy} version={undefined} />);
    expect(screen.getByText('Latest')).toBeInTheDocument();
  });

  it('hides summary, category, and updated date when omitted', () => {
    render(
      <PolicyCard {...policy} summary={undefined} updatedAt={undefined} />
    );
    expect(
      screen.queryByText('Guidelines for working remotely.')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Updated Jul 15')).not.toBeInTheDocument();
  });
});
