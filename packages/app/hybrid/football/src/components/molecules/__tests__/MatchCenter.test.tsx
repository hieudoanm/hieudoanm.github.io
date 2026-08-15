import { fireEvent, render, screen, within } from '@testing-library/react';
import { MatchCenter } from '@/components/molecules/MatchCenter';
import { MatchController } from '@/hooks/useMatch';
import { defaultMatch, MatchState } from '@/lib/match';

const controllerStub = (match: MatchState): MatchController => ({
  match,
  start: jest.fn(),
  pause: jest.fn(),
  reset: jest.fn(),
  addGoal: jest.fn(),
  addConcede: jest.fn(),
  undoGoal: jest.fn(),
  undoConcede: jest.fn(),
  addCard: jest.fn(),
  setAddedTime: jest.fn(),
  recordSubstitution: jest.fn(),
});

describe('MatchCenter', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders score, event, and substitution controls', () => {
    render(<MatchCenter controller={controllerStub(defaultMatch())} />);
    expect(screen.getByLabelText('Match time')).toBeInTheDocument();
    expect(screen.getByLabelText('Goals for')).toHaveTextContent('0');
    expect(screen.getByLabelText('Goals against')).toHaveTextContent('0');
    expect(screen.getByLabelText('Added time')).toHaveTextContent('0 min');
    expect(screen.getByLabelText('Substitutions used')).toHaveTextContent(
      '0/5'
    );
    expect(screen.getByText(/No events yet/)).toBeInTheDocument();
  });

  it('invokes the goal handler when scoring', () => {
    const controller = controllerStub(defaultMatch());
    render(<MatchCenter controller={controller} />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase goals for' }));
    expect(controller.addGoal).toHaveBeenCalledTimes(1);
    fireEvent.click(
      screen.getByRole('button', { name: 'Increase goals against' })
    );
    expect(controller.addConcede).toHaveBeenCalledTimes(1);
  });

  it('invokes card and added-time handlers', () => {
    const controller = controllerStub(defaultMatch());
    render(<MatchCenter controller={controller} />);
    fireEvent.click(screen.getByRole('button', { name: 'Record yellow card' }));
    expect(controller.addCard).toHaveBeenCalledWith('yellow');
    fireEvent.click(screen.getByRole('button', { name: 'Record red card' }));
    expect(controller.addCard).toHaveBeenCalledWith('red');
    fireEvent.click(
      screen.getByRole('button', { name: 'Increase added time' })
    );
    expect(controller.setAddedTime).toHaveBeenCalledWith(1);
  });

  it('lists recorded events with their minutes', () => {
    const match: MatchState = {
      ...defaultMatch(),
      events: [
        { id: 'e1', type: 'goal', minute: 23, added: 0 },
        { id: 'e2', type: 'yellow-card', minute: 90, added: 4 },
      ],
    };
    render(<MatchCenter controller={controllerStub(match)} />);
    const list = within(screen.getByTestId('match-events'));
    expect(list.getByText('Goal')).toBeInTheDocument();
    expect(list.getByText('Yellow card')).toBeInTheDocument();
    expect(list.getByText("23'")).toBeInTheDocument();
    expect(list.getByText("90+4'")).toBeInTheDocument();
  });

  it('shows a warning when the substitution limit is reached', () => {
    let match = defaultMatch();
    for (let i = 0; i < 5; i += 1) {
      match = {
        ...match,
        substitutions: match.substitutions + 1,
        events: [
          ...match.events,
          { id: `e${i}`, type: 'substitution', minute: i, added: 0 },
        ],
      };
    }
    render(<MatchCenter controller={controllerStub(match)} />);
    expect(screen.getByLabelText('Substitutions used')).toHaveTextContent(
      '5/5'
    );
    expect(screen.getByText('No substitutions left')).toBeInTheDocument();
  });
});
