import { fireEvent, render, screen } from '@testing-library/react';
import { PatientHealthQuestionnaire } from '../index';

const NAV = ['← Back', 'Next →', 'See Results →'];

const answerCurrentStep = () => {
  screen
    .getAllByRole('button')
    .filter((button) => !NAV.includes(button.textContent ?? ''))
    .forEach((button) => fireEvent.click(button));
};

const advance = () => {
  const nav = ['See Results →', 'Next →']
    .map((text) => screen.queryByText(text))
    .find(Boolean);
  if (!nav) throw new Error('wizard stuck');
  fireEvent.click(nav);
};

import { FrequencyStep } from '../components/FrequencyStep';
import { ResultsStep } from '../components/ResultsStep';
import { PHQ_ITEMS, PHQ_OPTIONS } from '../utils';

describe('PatientHealthQuestionnaire', () => {
  it('walks through every step to the results screen and back', () => {
    render(<PatientHealthQuestionnaire onClose={jest.fn()} />);
    for (let i = 0; i < 25 && !screen.queryByText('Start Over'); i += 1) {
      answerCurrentStep();
      advance();
    }
    expect(screen.getByText('Depression Severity Score'));
    fireEvent.click(screen.getByText('Start Over'));
    expect(
      screen.getByRole('button', { name: 'See Results →' })
    ).toBeDisabled();
  });
});

describe('FrequencyStep', () => {
  it('reports frequency clicks', () => {
    const onChange = jest.fn();
    render(
      <FrequencyStep
        items={PHQ_ITEMS}
        values={PHQ_ITEMS.map(() => -1)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChange).toHaveBeenCalledWith(0, PHQ_OPTIONS[0].value);
  });
});

describe('ResultsStep', () => {
  it('shows the maximum score and resets', () => {
    const onReset = jest.fn();
    render(
      <ResultsStep responses={PHQ_ITEMS.map(() => 3)} onReset={onReset} />
    );
    expect(screen.getByText(/27 \/ 27/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start Over'));
    expect(onReset).toHaveBeenCalled();
  });
});
