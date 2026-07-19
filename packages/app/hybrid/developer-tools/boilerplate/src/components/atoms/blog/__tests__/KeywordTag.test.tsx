import { render, screen } from '@testing-library/react';
import { KeywordTag } from '../KeywordTag';

describe('KeywordTag', () => {
  it('renders the label', () => {
    render(<KeywordTag label="hooks" />);
    expect(screen.getByText('hooks')).toHaveClass('badge', 'badge-ghost');
  });

  it('renders a link when href is provided', () => {
    render(<KeywordTag label="hooks" href="/tag/hooks" />);
    expect(screen.getByRole('link', { name: 'hooks' })).toHaveAttribute(
      'href',
      '/tag/hooks'
    );
  });

  it('exposes a testable data-testid', () => {
    render(<KeywordTag label="hooks" />);
    expect(screen.getByTestId('keyword-tag')).toBeInTheDocument();
  });
});
