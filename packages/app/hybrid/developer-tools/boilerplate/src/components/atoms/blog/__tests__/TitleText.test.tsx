import { render, screen } from '@testing-library/react';
import { TitleText } from '../TitleText';

describe('TitleText', () => {
  it('renders children at the default level', () => {
    render(<TitleText>Guide</TitleText>);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Guide' })
    ).toBeInTheDocument();
  });

  it('respects the level prop', () => {
    render(<TitleText level={1}>Guide</TitleText>);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Guide' })
    ).toBeInTheDocument();
  });

  it('applies bold title styling', () => {
    render(<TitleText>Guide</TitleText>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass(
      'font-bold',
      'tracking-tight'
    );
  });
});
