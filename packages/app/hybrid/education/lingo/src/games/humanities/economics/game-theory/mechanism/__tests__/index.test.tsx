import { fireEvent, render, screen } from '@testing-library/react';
import { RevelationGame } from '../index';

const mockValues = (values: number[]): void => {
  const sequence = values.map((v) => v / 100);
  jest
    .spyOn(Math, 'random')
    .mockReturnValueOnce(sequence[0])
    .mockReturnValueOnce(sequence[1])
    .mockReturnValueOnce(sequence[2]);
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe('RevelationGame', () => {
  it('renders the rule chooser', () => {
    render(<RevelationGame />);
    expect(screen.getByText(/A project costing 150/)).toBeInTheDocument();
    expect(screen.getByTestId('rule-equal')).toBeInTheDocument();
    expect(screen.getByTestId('rule-pivot')).toBeInTheDocument();
  });

  it('starts a round once a mechanism is picked', () => {
    mockValues([60, 90, 90]);
    render(<RevelationGame />);
    fireEvent.click(screen.getByTestId('rule-equal'));
    expect(screen.getByText(/Your private value/)).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByTestId('submit-report')).toBeInTheDocument();
  });

  it('lets the player free-ride under Equal Share when others fund the project', () => {
    mockValues([60, 90, 90]);
    render(<RevelationGame />);
    fireEvent.click(screen.getByTestId('rule-equal'));
    fireEvent.change(screen.getByTestId('report-input'), {
      target: { value: '0' },
    });
    fireEvent.click(screen.getByTestId('submit-report'));
    expect(screen.getByText(/Project built!/)).toBeInTheDocument();
    expect(screen.getByText('+10')).toBeInTheDocument();
    expect(screen.getByText(/could free-ride/)).toBeInTheDocument();
  });

  it('charges the Clarke tax when the player is pivotal under the pivot rule', () => {
    mockValues([80, 40, 40]);
    render(<RevelationGame />);
    fireEvent.click(screen.getByTestId('rule-pivot'));
    fireEvent.click(screen.getByTestId('quick-truth'));
    fireEvent.click(screen.getByTestId('submit-report'));
    expect(screen.getByText(/Project built!/)).toBeInTheDocument();
    expect(screen.getByText(/Your report was pivotal/)).toBeInTheDocument();
    expect(screen.getByText('-40')).toBeInTheDocument();
  });

  it('reports a lost project with no payoff', () => {
    mockValues([40, 40, 90]);
    render(<RevelationGame />);
    fireEvent.click(screen.getByTestId('rule-equal'));
    fireEvent.change(screen.getByTestId('report-input'), {
      target: { value: '0' },
    });
    fireEvent.click(screen.getByTestId('submit-report'));
    expect(screen.getByText('Project not built')).toBeInTheDocument();
    expect(screen.getAllByText('+0')).toHaveLength(2);
  });

  it('reaches the results screen after all rounds and restarts', () => {
    jest.spyOn(Math, 'random').mockImplementation(() => 0.9);
    render(<RevelationGame />);
    for (let round = 0; round < 5; round++) {
      fireEvent.click(screen.getByTestId('rule-equal'));
      fireEvent.change(screen.getByTestId('report-input'), {
        target: { value: '0' },
      });
      fireEvent.click(screen.getByTestId('submit-report'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    expect(
      screen.getByText(/Your net total across 5 rounds:/)
    ).toBeInTheDocument();
    expect(screen.getAllByText('+200')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText(/A project costing 150/)).toBeInTheDocument();
  });
});
