import { fireEvent, render, screen } from '@testing-library/react';
import { NudgeGame } from '../index';
import type { Design } from '../types';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    buildReport: (
      round: number,
      domain: {
        id: string;
        target: number;
        mechanism: string;
        mechanismText: string;
      },
      design: string,
      inertia: number
    ) => {
      const participation = design === 'opt-in' ? 40 : 90;
      return {
        round,
        domainId: domain.id,
        design,
        inertia,
        participation,
        target: domain.target,
        hitTarget: participation >= domain.target,
        recommendedDesign: 'opt-out',
        recommendedParticipation: 90,
        mechanism: domain.mechanism,
        mechanismText: domain.mechanismText,
      };
    },
    computeSimulator: (defaultRate: number) => ({
      defaultRate,
      employees: 100,
      savers: defaultRate > 0 ? 92 : 42,
      target: 85,
      hitTarget: defaultRate > 0,
    }),
  };
});

const playRound = (design: Design) => {
  fireEvent.click(screen.getByTestId(`design-${design}`));
  fireEvent.click(screen.getByTestId('check'));
};

const playRoundsToSimulator = () => {
  for (let i = 0; i < 6; i++) {
    playRound('opt-out');
    fireEvent.click(
      screen.getByRole('button', {
        name: /Next Scenario|Try the Auto-enroll Simulator/,
      })
    );
  }
};

describe('NudgeGame', () => {
  it('shows the first design scenario with baseline rates', () => {
    render(<NudgeGame />);
    expect(screen.getByText('401(k) enrollment')).toBeInTheDocument();
    expect(screen.getByTestId('design')).toBeInTheDocument();
    expect(screen.getByTestId('opt-in-rate')).toHaveTextContent('42%');
    expect(screen.getByTestId('opt-out-rate')).toHaveTextContent('80%');
    expect(screen.getByTestId('active-rate')).toHaveTextContent('65%');
  });

  it('reveals the mechanism when a poor design misses the target', () => {
    render(<NudgeGame />);
    playRound('opt-in');
    expect(screen.getByTestId('participation')).toHaveTextContent('40%');
    expect(screen.getByTestId('hit-status')).toHaveTextContent('target missed');
    expect(screen.getByTestId('mechanism')).toHaveTextContent(/Default effect/);
  });

  it('reveals a target hit for an opt-out design', () => {
    render(<NudgeGame />);
    playRound('opt-out');
    expect(screen.getByTestId('participation')).toHaveTextContent('90%');
    expect(screen.getByTestId('hit-status')).toHaveTextContent('target hit');
  });

  it('moves to the auto-enroll simulator after the final scenario', () => {
    render(<NudgeGame />);
    playRoundsToSimulator();
    expect(screen.getByText('Auto-enroll Simulator')).toBeInTheDocument();
    expect(screen.getByTestId('employees')).toHaveTextContent('100');
    expect(screen.getByTestId('target')).toHaveTextContent('85%');
  });

  it('scores savers in the simulator and reaches the final report', () => {
    render(<NudgeGame />);
    playRoundsToSimulator();
    fireEvent.change(screen.getByTestId('sim-default'), {
      target: { value: '3' },
    });
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('savers')).toHaveTextContent('92');
    expect(screen.getByTestId('hit-status')).toHaveTextContent('hit');
    fireEvent.click(screen.getByRole('button', { name: /See Final Report/ }));
    expect(screen.getByText(/Nudge Design Lab report/)).toBeInTheDocument();
  });

  it('restarts the game from the final report', () => {
    render(<NudgeGame />);
    playRoundsToSimulator();
    fireEvent.click(screen.getByTestId('check'));
    fireEvent.click(screen.getByRole('button', { name: /See Final Report/ }));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByText('401(k) enrollment')).toBeInTheDocument();
  });
});
