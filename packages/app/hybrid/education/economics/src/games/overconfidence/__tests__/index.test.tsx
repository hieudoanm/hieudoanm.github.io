import { fireEvent, render, screen } from '@testing-library/react';
import { CalibrationGame } from '../index';

const wrongIndices = [0, 1];

const answerAllQuestions = () => {
  for (let i = 0; i < 10; i++) {
    fireEvent.click(screen.getByTestId('confidence-80'));
    if (wrongIndices.includes(i)) {
      fireEvent.click(screen.getByTestId('option-b'));
    } else {
      fireEvent.click(screen.getByTestId('option-a'));
    }
    fireEvent.click(screen.getByTestId('submit'));
    fireEvent.click(screen.getByTestId('next'));
  }
};

const playToSlider = () => {
  answerAllQuestions();
  fireEvent.click(screen.getByTestId('next'));
  fireEvent.click(screen.getByTestId('next'));
  fireEvent.click(screen.getByTestId('next'));
};

describe('CalibrationGame', () => {
  it('renders the first question with options and confidence choices', () => {
    render(<CalibrationGame />);
    expect(screen.getByTestId('question')).toBeInTheDocument();
    expect(screen.getByTestId('option-a')).toBeInTheDocument();
    expect(screen.getByTestId('option-b')).toBeInTheDocument();
    expect(screen.getByTestId('confidence')).toBeInTheDocument();
  });

  it('does not reveal an answer until an option and confidence are chosen', () => {
    render(<CalibrationGame />);
    fireEvent.click(screen.getByTestId('submit'));
    expect(screen.getByTestId('question')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('option-a'));
    fireEvent.click(screen.getByTestId('confidence-70'));
    fireEvent.click(screen.getByTestId('submit'));
    expect(screen.getByTestId('answer')).toBeInTheDocument();
    expect(screen.getByTestId('score')).toBeInTheDocument();
    expect(screen.getByTestId('accuracy')).toBeInTheDocument();
    expect(screen.getByTestId('bucket')).toBeInTheDocument();
  });

  it('reaches an aggregate table with overconfidence gaps', () => {
    render(<CalibrationGame />);
    answerAllQuestions();
    expect(screen.getByText('Calibration Check')).toBeInTheDocument();
    expect(screen.getAllByTestId('overconfidence-gap').length).toBeGreaterThan(
      0
    );
  });

  it('runs the market round and shows why overconfidence blows up', () => {
    render(<CalibrationGame />);
    answerAllQuestions();
    fireEvent.click(screen.getByTestId('next'));
    expect(screen.getByText(/The Trader/)).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('trader-position'), {
      target: { value: '90' },
    });
    fireEvent.click(screen.getByTestId('next'));
    expect(screen.getByTestId('market-result')).toBeInTheDocument();
    expect(screen.getByText(/Blow-up Risk/)).toBeInTheDocument();
  });

  it('runs the slider estimation round', () => {
    render(<CalibrationGame />);
    playToSlider();
    expect(screen.getByText('Range Estimation')).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('bracket-low'), {
      target: { value: '5000' },
    });
    fireEvent.change(screen.getByTestId('bracket-high'), {
      target: { value: '8000' },
    });
    fireEvent.click(screen.getByTestId('next'));
    expect(screen.getByTestId('slider-result')).toBeInTheDocument();
  });

  it('reaches the conclusion and can be reset', () => {
    render(<CalibrationGame />);
    playToSlider();
    fireEvent.change(screen.getByTestId('bracket-low'), {
      target: { value: '5000' },
    });
    fireEvent.change(screen.getByTestId('bracket-high'), {
      target: { value: '8000' },
    });
    fireEvent.click(screen.getByTestId('next'));
    fireEvent.click(screen.getByTestId('next'));
    expect(screen.getByText('Calibration, not Charisma')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('question')).toBeInTheDocument();
  });
});
