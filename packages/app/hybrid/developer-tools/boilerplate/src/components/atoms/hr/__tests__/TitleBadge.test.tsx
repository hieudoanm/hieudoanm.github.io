import { render, screen } from '@testing-library/react';
import { TitleBadge } from '../TitleBadge';

describe('TitleBadge', () => {
  it('renders the title', () => {
    render(<TitleBadge title="Senior Engineer" />);
    expect(screen.getByTestId('title-badge')).toHaveTextContent(
      'Senior Engineer'
    );
  });

  it('applies the variant class', () => {
    render(<TitleBadge title="Lead" variant="neutral" />);
    expect(screen.getByTestId('title-badge')).toHaveClass('badge-neutral');
  });
});
