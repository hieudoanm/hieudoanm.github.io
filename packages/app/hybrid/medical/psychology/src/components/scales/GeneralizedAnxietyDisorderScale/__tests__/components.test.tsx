import { fireEvent, render, screen } from '@testing-library/react';
import { GeneralizedAnxietyDisorderScale } from '../index';

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
import { GAD_ITEMS, GAD_OPTIONS } from '../utils';

describe('GeneralizedAnxietyDisorderScale', () => {
  it('walks through every step to the results screen and back', () => {
    render(<GeneralizedAnxietyDisorderScale onClose={jest.fn()} />);
    for (let i = 0; i < 25 && !screen.queryByText('Start Over'); i += 1) {
      answerCurrentStep();
      advance();
    }
    expect(screen.getByText('Anxiety Severity Score'));
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
        items={GAD_ITEMS}
        values={GAD_ITEMS.map(() => -1)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChange).toHaveBeenCalledWith(0, GAD_OPTIONS[0].value);
  });
});

describe('ResultsStep', () => {
  it('shows the maximum score and resets', () => {
    const onReset = jest.fn();
    render(
      <ResultsStep responses={GAD_ITEMS.map(() => 3)} onReset={onReset} />
    );
    expect(screen.getByText(/21 \/ 21/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start Over'));
    expect(onReset).toHaveBeenCalled();
  });
});
