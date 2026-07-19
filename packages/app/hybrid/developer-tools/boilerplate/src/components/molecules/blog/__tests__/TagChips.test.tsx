import { render, screen } from '@testing-library/react';
import { TagChips } from '../TagChips';

describe('TagChips', () => {
  it('renders the title and each tag as a link', () => {
    render(<TagChips tags={['React', 'Next.js', 'CSS']} title="Topics" />);
    expect(screen.getByText('Topics')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'React' })).toHaveAttribute(
      'href',
      '/tags/React'
    );
    expect(screen.getByRole('link', { name: 'Next.js' })).toBeInTheDocument();
  });

  it('uses the default title', () => {
    render(<TagChips tags={['React']} />);
    expect(screen.getByText('Tags')).toBeInTheDocument();
  });
});
