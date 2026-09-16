import { fireEvent, render, screen } from '@testing-library/react';
import { ROUNDS } from '../constants';
import { requiredDeltaG } from '../game';
import { KeynesianGame } from '../index';

describe('KeynesianGame', () => {
  it('renders the explore panel with default equilibrium', () => {
    render(<KeynesianGame />);
    expect(screen.getByTestId('mpc')).toBeInTheDocument();
    expect(screen.getByTestId('autonomous-c')).toBeInTheDocument();
    expect(screen.getByTestId('investment')).toBeInTheDocument();
    expect(screen.getByTestId('government')).toBeInTheDocument();
    expect(screen.getByTestId('equilibrium-output')).toHaveTextContent('500');
    expect(screen.getByTestId('multiplier')).toHaveTextContent('5');
  });

  it('recomputes equilibrium and multiplier as sliders move', () => {
    render(<KeynesianGame />);
    fireEvent.change(screen.getByTestId('mpc'), {
      target: { value: '0.75' },
    });
    expect(screen.getByTestId('multiplier')).toHaveTextContent('4');
    expect(screen.getByTestId('equilibrium-output')).toHaveTextContent('400');
    fireEvent.change(screen.getByTestId('investment'), {
      target: { value: '60' },
    });
    expect(screen.getByTestId('equilibrium-output')).toHaveTextContent('560');
  });

  it('starts the challenge and shows the gap and delta G controls', () => {
    render(<KeynesianGame />);
    fireEvent.click(screen.getByTestId('start-challenge'));
    expect(screen.getByTestId('gap')).toHaveTextContent('100');
    expect(screen.getByTestId('delta-g')).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeInTheDocument();
  });

  it('reveals a closed gap with the correct delta G', () => {
    render(<KeynesianGame />);
    fireEvent.click(screen.getByTestId('start-challenge'));
    fireEvent.change(screen.getByTestId('delta-g'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('required-delta-g')).toHaveTextContent('20');
    expect(screen.getByTestId('equilibrium-output')).toHaveTextContent('600');
    expect(screen.getByTestId('planned-expenditure')).toHaveTextContent('600');
    expect(screen.getByTestId('unplanned-inventory')).toHaveTextContent('0');
    expect(screen.getByTestId('reveal-score')).toHaveTextContent('5');
  });

  it('resets the challenge from the header', () => {
    render(<KeynesianGame />);
    fireEvent.click(screen.getByTestId('start-challenge'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('mpc')).toBeInTheDocument();
    expect(screen.getByTestId('equilibrium-output')).toHaveTextContent('500');
  });

  it('completes all rounds and restarts', () => {
    render(<KeynesianGame />);
    fireEvent.click(screen.getByTestId('start-challenge'));
    for (const profile of ROUNDS) {
      const required = Math.round(
        requiredDeltaG(
          profile.a,
          profile.mpc,
          profile.investment,
          profile.government,
          profile.target
        )
      );
      fireEvent.change(screen.getByTestId('delta-g'), {
        target: { value: String(required) },
      });
      fireEvent.click(screen.getByTestId('check'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Challenge Summary/ })
      );
    }
    expect(screen.getByText('Challenge complete')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(1 + ROUNDS.length);
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('mpc')).toBeInTheDocument();
  });
});
