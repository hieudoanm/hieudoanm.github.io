import { fireEvent, render, screen } from '@testing-library/react';
import { BrowseScreen } from '../../components/screens/BrowseScreen';
import { useGameStore } from '../../store';

describe('BrowseScreen', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });
  afterEach(() => {
    useGameStore.getState().reset();
  });

  it('renders the deck header and compact event chips', () => {
    render(<BrowseScreen />);
    expect(screen.getByRole('heading', { name: 'World' })).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThan(50);
  });

  it('shows the selected event details', () => {
    const { container } = render(<BrowseScreen />);
    const chips = screen.getAllByRole('button');
    const yearChip = chips.find((chip) => /^\d/.test(chip.textContent ?? ''));
    fireEvent.click(yearChip!);
    expect(container.querySelector('h2.card-title')).toBeInTheDocument();
    expect(container.querySelector('.card-body')).toBeInTheDocument();
  });

  it('compares with a second deck via the select', () => {
    render(<BrowseScreen />);
    fireEvent.change(
      screen.getByLabelText('Compare with another set of events'),
      { target: { value: 'egypt' } }
    );
    expect(screen.getAllByText('Egypt').length).toBeGreaterThan(1);
  });

  it('returns to setup from the back button', () => {
    render(<BrowseScreen />);
    fireEvent.click(screen.getByRole('button', { name: 'Back to setup' }));
    expect(useGameStore.getState().phase).toBe('menu');
  });
});
