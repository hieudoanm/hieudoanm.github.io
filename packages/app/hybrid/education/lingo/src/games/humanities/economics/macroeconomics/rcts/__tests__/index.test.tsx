import { fireEvent, render, screen } from '@testing-library/react';
import { TOTAL_ROUNDS } from '../constants';
import { RctSimulatorGame } from '../index';

const runRandomizedStudy = () => {
  fireEvent.click(screen.getByRole('button', { name: /Study B/ }));
  fireEvent.click(screen.getByTestId('run'));
};

const playRound = () => {
  runRandomizedStudy();
  fireEvent.click(screen.getByTestId('significant-yes'));
  fireEvent.click(screen.getByTestId('submit-study'));
  fireEvent.click(
    screen.getByRole('button', { name: /Next Study|See Results/ })
  );
};

describe('RctSimulatorGame', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.25);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows trial designer controls after picking a study', () => {
    render(<RctSimulatorGame />);
    expect(screen.queryByTestId('run')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Study A/ }));
    expect(screen.getByTestId('sample-size')).toBeInTheDocument();
    expect(screen.getByTestId('allocation')).toBeInTheDocument();
    expect(screen.getByTestId('run')).toBeInTheDocument();
  });

  it('runs a trial and reports ATE, CI, significance and power', () => {
    render(<RctSimulatorGame />);
    runRandomizedStudy();
    expect(screen.getByTestId('ate')).toHaveTextContent('0.310');
    expect(screen.getByTestId('ci')).toHaveTextContent('to');
    expect(screen.getByTestId('significant')).toHaveTextContent('Yes');
    expect(screen.getByTestId('power')).toHaveTextContent('%');
  });

  it('requires a significance call before submitting', () => {
    render(<RctSimulatorGame />);
    runRandomizedStudy();
    expect(screen.getByTestId('submit-study')).toBeDisabled();
    fireEvent.click(screen.getByTestId('significant-yes'));
    expect(screen.getByTestId('submit-study')).toBeEnabled();
  });

  it('reveals the randomized-design verdict after submitting', () => {
    render(<RctSimulatorGame />);
    runRandomizedStudy();
    fireEvent.click(screen.getByTestId('significant-yes'));
    fireEvent.click(screen.getByTestId('submit-study'));
    expect(screen.getByText('Randomized design')).toBeInTheDocument();
    expect(screen.getByText('Significance call correct')).toBeInTheDocument();
  });

  it('completes all studies into a results screen', () => {
    render(<RctSimulatorGame />);
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      playRound();
    }
    expect(screen.getByText('RCT Simulator results')).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<RctSimulatorGame />);
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      playRound();
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(
      screen.getByText(/Deworming & School Attendance/)
    ).toBeInTheDocument();
  });
});
