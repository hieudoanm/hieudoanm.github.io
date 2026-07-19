import { render, screen } from '@testing-library/react';
import { HeadingText } from '../HeadingText';

describe('HeadingText', () => {
  it('renders children at the default level', () => {
    render(<HeadingText>Hello</HeadingText>);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Hello' })
    ).toBeInTheDocument();
  });

  it('respects the level prop', () => {
    render(<HeadingText level={3}>Hello</HeadingText>);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Hello' })
    ).toBeInTheDocument();
  });

  it('applies level size classes', () => {
    render(<HeadingText level={1}>Hello</HeadingText>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass(
      'text-4xl',
      'font-light'
    );
  });
});
