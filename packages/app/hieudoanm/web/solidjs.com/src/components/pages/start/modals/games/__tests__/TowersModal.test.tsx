import { render, screen, fireEvent } from '@solidjs/testing-library';
import { TowersModal } from '../TowersModal';

describe('TowersModal', () => {
  it('renders Move count', () => {
    render(() => <TowersModal onClose={() => {}} />);
    expect(screen.getByText(/Moves/)).toBeInTheDocument();
  });

  it('renders Undo, Redo, Auto Solve, Reset buttons', () => {
    render(() => <TowersModal onClose={() => {}} />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Redo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('shows optimal move count', () => {
    render(() => <TowersModal onClose={() => {}} />);
    expect(screen.getByText(/Optimal/)).toBeInTheDocument();
  });

  it('renders disk count slider', () => {
    render(() => <TowersModal onClose={() => {}} />);
    const slider = document.querySelector(
      'input[type="range"]'
    ) as HTMLInputElement;
    expect(slider).toBeInTheDocument();
  });
});
