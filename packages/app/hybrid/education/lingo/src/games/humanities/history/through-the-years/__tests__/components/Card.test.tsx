import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from '../../components/components/Card';
import { EVENT_A, makeEvent } from '../../testing/fixtures';

describe('Card', () => {
  it('hides the year while playing and shows category and difficulty', () => {
    render(
      <Card
        event={EVENT_A}
        showYear={false}
        hintText=""
        hintLevel={0}
        onHint={jest.fn()}
      />
    );
    expect(screen.getByText('Event A')).toBeInTheDocument();
    expect(screen.getByText('???')).toBeInTheDocument();
    expect(screen.getByText('war')).toBeInTheDocument();
    expect(screen.getByText('★★★☆☆')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Use Hint' })
    ).toBeInTheDocument();
  });

  it('shows the BC year during reveal without a hint button', () => {
    const bc = makeEvent('bc', -44, 'Ides of March');
    render(
      <Card
        event={bc}
        showYear
        hintText="40s BC"
        hintLevel={1}
        onHint={jest.fn()}
      />
    );
    expect(screen.getByText('44 BC')).toBeInTheDocument();
    expect(screen.getByText('40s BC')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Use Hint' })).toBeNull();
  });

  it('calls onHint when the hint button is clicked', () => {
    const onHint = jest.fn();
    render(
      <Card
        event={EVENT_A}
        showYear={false}
        hintText=""
        hintLevel={0}
        onHint={onHint}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Use Hint' }));
    expect(onHint).toHaveBeenCalledTimes(1);
  });
});
