import { render, screen } from '@testing-library/react';
import { Masonry } from '../Masonry';

describe('Masonry', () => {
  it('renders items', () => {
    render(<Masonry items={[<p key="a">One</p>, <p key="b">Two</p>]} />);
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('applies the requested column count', () => {
    const { container } = render(
      <Masonry items={[<p key="a">One</p>]} columns={2} />
    );
    expect(container.firstChild).toHaveClass('columns-2');
  });

  it('applies the gap size', () => {
    const { container } = render(
      <Masonry items={[<p key="a">One</p>]} gap="lg" />
    );
    expect(container.firstChild).toHaveClass('gap-6');
  });
});
