import { render, screen, within } from '@testing-library/react';
import { Container } from '../Container';

describe('Container', () => {
  it('renders children within a centered wrapper', () => {
    render(<Container>Hello</Container>);
    expect(screen.getByText('Hello')).toHaveClass(
      'mx-auto',
      'w-full',
      'px-4',
      'max-w-xl'
    );
  });

  it('applies the requested size and className', () => {
    render(
      <Container size="2xl" className="my-8">
        Hello
      </Container>
    );
    expect(screen.getByText('Hello')).toHaveClass('max-w-2xl', 'my-8');
  });
});
