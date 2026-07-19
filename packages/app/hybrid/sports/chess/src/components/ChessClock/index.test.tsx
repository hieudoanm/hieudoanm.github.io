import { fireEvent, render, screen } from '@testing-library/react';
import { ChessClock } from './index';

describe('ChessClock', () => {
  const gear = () =>
    screen.getAllByRole('button').find((b) => b.innerHTML.includes('svg'));

  it('opens the custom editor with asymmetric and delay fields', () => {
    render(<ChessClock onClose={jest.fn()} />);
    const btn = gear();
    if (btn) fireEvent.click(btn);
    expect(screen.getByText('P1 min')).toBeInTheDocument();
    expect(screen.getByText('P2 min')).toBeInTheDocument();
    expect(screen.getByText('Delay')).toBeInTheDocument();
    expect(screen.getByText('Moves to go')).toBeInTheDocument();
  });

  it('toggles sound and tick settings', () => {
    render(<ChessClock onClose={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Sound on/i }));
    expect(
      screen.getByRole('button', { name: /Sound off/i })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Tick off/i }));
    expect(
      screen.getByRole('button', { name: /Tick on/i })
    ).toBeInTheDocument();
  });

  it('enters and exits fullscreen mode', () => {
    render(<ChessClock onClose={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Fullscreen/i }));
    expect(
      screen.getByRole('button', { name: /Exit fullscreen/i })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Exit fullscreen/i }));
    expect(
      screen.getByRole('button', { name: /Fullscreen/i })
    ).toBeInTheDocument();
  });

  it('records move times when switching sides', () => {
    render(<ChessClock onClose={jest.fn()} />);
    const white = screen
      .getAllByRole('button')
      .find(
        (b) =>
          b.textContent?.includes('White') && !b.textContent?.includes('wins')
      );
    const black = screen
      .getAllByRole('button')
      .find(
        (b) =>
          b.textContent?.includes('Black') && !b.textContent?.includes('wins')
      );
    if (white) fireEvent.click(white);
    if (black) fireEvent.click(black);
    expect(screen.getByText('Move times')).toBeInTheDocument();
    expect(screen.queryByText('No moves yet.')).not.toBeInTheDocument();
  });
});
