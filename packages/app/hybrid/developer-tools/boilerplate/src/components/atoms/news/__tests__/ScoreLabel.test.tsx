import { render, screen } from '@testing-library/react';
import { ScoreLabel } from '../ScoreLabel';

describe('ScoreLabel', () => {
  it('renders score out of default max', () => {
    render(<ScoreLabel score={8} />);
    expect(screen.getByTestId('score-label')).toHaveTextContent('Score: 8/10');
  });

  it('renders custom max', () => {
    render(<ScoreLabel score={85} outOf={100} />);
    expect(screen.getByTestId('score-label')).toHaveTextContent(
      'Score: 85/100'
    );
  });

  it('renders custom label', () => {
    render(<ScoreLabel score={9} label="Rating" />);
    expect(screen.getByTestId('score-label')).toHaveTextContent('Rating: 9/10');
  });
});
