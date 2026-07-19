import { fireEvent, render, screen } from '@testing-library/react';
import { HydrationTracker } from '../HydrationTracker';

describe('HydrationTracker', () => {
  it('renders the current volume against the goal', () => {
    render(<HydrationTracker goal={8} initialGlasses={2} />);
    expect(screen.getByTestId('volume')).toHaveTextContent('500 ml of 2000 ml');
  });

  it('adds a glass when the add button is clicked', () => {
    render(<HydrationTracker goal={8} initialGlasses={2} />);
    fireEvent.click(screen.getByTestId('add-glass'));
    expect(screen.getByTestId('volume')).toHaveTextContent('750 ml of 2000 ml');
  });

  it('removes a glass when the remove button is clicked', () => {
    render(<HydrationTracker goal={8} initialGlasses={2} />);
    fireEvent.click(screen.getByTestId('remove-glass'));
    expect(screen.getByTestId('volume')).toHaveTextContent('250 ml of 2000 ml');
  });

  it('disables the remove button at zero glasses', () => {
    render(<HydrationTracker goal={8} initialGlasses={0} />);
    expect(screen.getByTestId('remove-glass')).toBeDisabled();
  });
});
