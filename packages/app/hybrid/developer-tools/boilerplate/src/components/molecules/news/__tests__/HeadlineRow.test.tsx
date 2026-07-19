import { render, screen } from '@testing-library/react';
import { HeadlineRow } from '../HeadlineRow';

describe('HeadlineRow', () => {
  it('renders the headline title', () => {
    render(<HeadlineRow title="Election results announced" />);
    expect(screen.getByText('Election results announced')).toBeInTheDocument();
  });

  it('renders section and time meta', () => {
    render(
      <HeadlineRow title="Budget debate" section="Politics" time="10 min ago" />
    );
    expect(screen.getByText('Politics')).toBeInTheDocument();
    expect(screen.getByText('10 min ago')).toBeInTheDocument();
  });

  it('renders rank when provided', () => {
    render(<HeadlineRow title="Tech rally" rank={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders a link when href is provided', () => {
    render(<HeadlineRow title="Science win" href="/science/win" />);
    expect(screen.getByRole('link', { name: 'Science win' })).toHaveAttribute(
      'href',
      '/science/win'
    );
  });
});
