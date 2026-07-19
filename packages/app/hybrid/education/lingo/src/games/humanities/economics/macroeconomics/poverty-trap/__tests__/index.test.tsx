import { fireEvent, render, screen } from '@testing-library/react';
import { PovertyTrapGame } from '../index';

describe('PovertyTrapGame', () => {
  it('renders the simulation controls and trapped household by default', () => {
    render(<PovertyTrapGame />);
    expect(screen.getByTestId('initial-capital')).toHaveValue('5');
    expect(screen.getByTestId('savings-rate')).toHaveValue('0.2');
    expect(screen.getByTestId('subsistence')).toHaveValue('30');
    expect(screen.getByTestId('threshold')).toBeInTheDocument();
    expect(screen.getByTestId('phase')).toHaveTextContent('Trapped');
  });

  it('shows a 20-year simulation table', () => {
    render(<PovertyTrapGame />);
    expect(screen.getAllByTestId('year')).toHaveLength(20);
    expect(screen.getAllByTestId('income').length).toBe(20);
    expect(screen.getAllByTestId('net-savings').length).toBe(20);
    expect(screen.getAllByTestId('capital').length).toBe(20);
  });

  it('keeps the default poor household below the threshold', () => {
    render(<PovertyTrapGame />);
    expect(screen.getByTestId('reached-threshold')).toHaveTextContent(
      'Below threshold'
    );
  });

  it('flips the household to escaping when capital rises above the threshold', () => {
    render(<PovertyTrapGame />);
    fireEvent.change(screen.getByTestId('initial-capital'), {
      target: { value: '60' },
    });
    expect(screen.getByTestId('initial-capital-value')).toHaveTextContent('60');
    expect(screen.getByTestId('phase')).toHaveTextContent('Escaping');
    expect(screen.getByTestId('reached-threshold')).toHaveTextContent(
      'Reached threshold'
    );
  });

  it('moves to the policy challenge panel', () => {
    render(<PovertyTrapGame />);
    fireEvent.click(screen.getByTestId('start-policy'));
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
    expect(screen.getByTestId('transfer')).toBeInTheDocument();
    expect(screen.getByTestId('escape-now')).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
  });

  it('shows that a large transfer escapes the trap', () => {
    render(<PovertyTrapGame />);
    fireEvent.click(screen.getByTestId('start-policy'));
    fireEvent.change(screen.getByTestId('transfer'), {
      target: { value: '40' },
    });
    fireEvent.click(screen.getByTestId('escape-now'));
    expect(screen.getByText(/escapes the trap/)).toBeInTheDocument();
  });

  it('reveals the minimum transfer needed after checking', () => {
    render(<PovertyTrapGame />);
    fireEvent.click(screen.getByTestId('start-policy'));
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('transfer-needed')).toHaveTextContent('35');
  });

  it('scores a correct answer', () => {
    render(<PovertyTrapGame />);
    fireEvent.click(screen.getByTestId('start-policy'));
    fireEvent.change(screen.getByTestId('guess'), {
      target: { value: '36' },
    });
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByText(/Correct!/)).toBeInTheDocument();
    expect(screen.getByTestId('score')).toHaveTextContent('1');
  });
});
