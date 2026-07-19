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
