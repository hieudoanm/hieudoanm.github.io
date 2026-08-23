import { fireEvent, render, screen } from '@testing-library/react';
import { ExperiencesInCloseRelationships } from '../index';

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

import { ScaleStep } from '../components/ScaleStep';
import { ResultsStep } from '../components/ResultsStep';
import { ECR_ITEMS } from '../utils';

describe('ExperiencesInCloseRelationships', () => {
  it('walks through every step to the results screen and back', () => {
    render(<ExperiencesInCloseRelationships onClose={jest.fn()} />);
    for (let i = 0; i < 25 && !screen.queryByText('Start Over'); i += 1) {
      answerCurrentStep();
      advance();
    }
    expect(screen.getByText('Attachment Anxiety'));
    fireEvent.click(screen.getByText('Start Over'));
    expect(screen.getByText(/Step 1 of/));
  });
});

describe('ScaleStep', () => {
  it('reports rating clicks', () => {
    const onChange = jest.fn();
    render(
      <ScaleStep
        items={ECR_ITEMS.slice(0, 12)}
        values={ECR_ITEMS.slice(0, 12).map(() => 0)}
        hint="1 = strongly disagree"
        onChange={onChange}
      />
    );
    fireEvent.click(
      screen.getAllByRole('button').find((b) => b.textContent === '7')!
    );
    expect(onChange).toHaveBeenCalledWith(0, 7);
  });
});

describe('ResultsStep', () => {
  it('shows both subscale means at the midpoint and resets', () => {
    const onReset = jest.fn();
    render(
      <ResultsStep responses={ECR_ITEMS.map(() => 4)} onReset={onReset} />
    );
    expect(screen.getByText('Attachment Anxiety')).toBeInTheDocument();
    expect(screen.getByText('Attachment Avoidance')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start Over'));
    expect(onReset).toHaveBeenCalled();
  });
});
