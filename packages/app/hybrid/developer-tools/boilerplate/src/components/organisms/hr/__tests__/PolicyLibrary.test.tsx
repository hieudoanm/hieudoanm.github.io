import { render, screen } from '@testing-library/react';
import { PolicyLibrary } from '../PolicyLibrary';

describe('PolicyLibrary', () => {
  const policies = [
    {
      id: '1',
      title: 'Remote work policy',
      category: 'Workplace',
      version: 'v2.1',
      updated: '2026-07-01',
      status: 'active' as const,
    },
    {
      id: '2',
      title: 'Expense policy',
      category: 'Finance',
      version: 'v1.0',
      updated: '2026-06-15',
      status: 'draft' as const,
    },
  ];

  it('renders policy rows with metadata', () => {
    render(<PolicyLibrary policies={policies} />);
    expect(screen.getByText('Remote work policy')).toBeInTheDocument();
    expect(screen.getByText('v2.1')).toBeInTheDocument();
  });

  it('applies status badge classes', () => {
    render(<PolicyLibrary policies={policies} />);
    expect(screen.getByText('active')).toHaveClass('badge-success');
    expect(screen.getByText('draft')).toHaveClass('badge-warning');
  });

  it('shows an empty state when no policies exist', () => {
    render(<PolicyLibrary policies={[]} />);
    expect(screen.getByText('No policies published')).toBeInTheDocument();
  });
});
