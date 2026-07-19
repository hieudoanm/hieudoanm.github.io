import { fireEvent, render, screen } from '@testing-library/react';
import { ActivityLogTemplate } from '../ActivityLogTemplate';

describe('ActivityLogTemplate', () => {
  it('renders the initial timeline', () => {
    render(<ActivityLogTemplate />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('created the project "Alpha"')).toBeInTheDocument();
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
    expect(screen.queryByText('rotated API keys')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Load more/ })
    ).toBeInTheDocument();
  });

  it('filters activity by admin type', () => {
    render(<ActivityLogTemplate />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'admin' },
    });
    expect(screen.getAllByText('Ops Team')).toHaveLength(3);
    expect(screen.queryByText('Alice Chen')).not.toBeInTheDocument();
    expect(screen.getByText('End of activity')).toBeInTheDocument();
  });

  it('filters activity by system type', () => {
    render(<ActivityLogTemplate />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'system' },
    });
    expect(screen.getByText('ran an automated backup')).toBeInTheDocument();
    expect(
      screen.queryByText('created the project "Alpha"')
    ).not.toBeInTheDocument();
    expect(screen.getByText('End of activity')).toBeInTheDocument();
  });

  it('loads more activity until the end is reached', () => {
    render(<ActivityLogTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Load more/ }));
    expect(screen.getByText('rotated API keys')).toBeInTheDocument();
    expect(screen.getByText('updated billing details')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Load more/ }));
    expect(screen.getByText('End of activity')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Load more/ })
    ).not.toBeInTheDocument();
  });
});
