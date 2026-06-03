import { render, screen, fireEvent } from '@solidjs/testing-library';
import { T3Modal } from '../T3Modal';

describe('T3Modal', () => {
  const getCells = () =>
    screen
      .getAllByRole('button')
      .filter(
        (b) => b.classList.contains('btn-square') && b.textContent !== '✕'
      );

  it('renders 9 cells', () => {
    render(() => <T3Modal onClose={() => {}} />);
    expect(getCells()).toHaveLength(9);
  });

  it('renders Reset and Undo buttons', () => {
    render(() => <T3Modal onClose={() => {}} />);
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });

  it('shows current player X by default', () => {
    render(() => <T3Modal onClose={() => {}} />);
    expect(screen.getByText(/Current/)).toBeInTheDocument();
  });

  it('cells respond to clicks', () => {
    render(() => <T3Modal onClose={() => {}} />);
    const cells = getCells();
    (cells[0] as HTMLButtonElement).click();
    expect(getCells()[0].textContent).toBe('X');
  });

  it('shows win message when a player wins', () => {
    render(() => <T3Modal onClose={() => {}} />);
    let cells = getCells();
    (cells[0] as HTMLButtonElement).click();
    cells = getCells();
    (cells[3] as HTMLButtonElement).click();
    cells = getCells();
    (cells[1] as HTMLButtonElement).click();
    cells = getCells();
    (cells[4] as HTMLButtonElement).click();
    cells = getCells();
    (cells[2] as HTMLButtonElement).click();
    expect(screen.getByText(/Winner/)).toBeInTheDocument();
  });
});
