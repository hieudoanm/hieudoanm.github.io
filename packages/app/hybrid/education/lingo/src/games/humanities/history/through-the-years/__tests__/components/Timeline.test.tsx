import { fireEvent, render, screen } from '@testing-library/react';
import { Timeline } from '../../components/components/Timeline';
import { EVENT_A, EVENT_B, EVENT_C } from '../../testing/fixtures';

describe('Timeline', () => {
  it('renders one placement slot per gap while playing', () => {
    const onPlace = jest.fn();
    render(
      <Timeline
        events={[EVENT_A, EVENT_B]}
        currentCard={EVENT_C}
        phase="playing"
        lastResult={null}
        onPlace={onPlace}
      />
    );
    expect(screen.getAllByText('Event A').length).toBeGreaterThan(0);
    expect(screen.getByText('1900')).toBeInTheDocument();
    const slots = screen.getAllByRole('button', { name: 'Place here' });
    expect(slots).toHaveLength(3);
    fireEvent.click(slots[1]);
    expect(onPlace).toHaveBeenCalledWith(1);
  });

  it('shows the revealed card at its correct index', () => {
    render(
      <Timeline
        events={[EVENT_A, EVENT_B]}
        currentCard={EVENT_C}
        phase="reveal"
        lastResult={{ correct: false, correctIndex: 1, event: EVENT_C }}
        onPlace={jest.fn()}
      />
    );
    expect(screen.getByText('Correct position')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
  });

  it('renders without a current card during reveal', () => {
    render(
      <Timeline
        events={[EVENT_A]}
        currentCard={null}
        phase="reveal"
        lastResult={null}
        onPlace={jest.fn()}
      />
    );
    expect(screen.queryByRole('button')).toBeNull();
  });
});
