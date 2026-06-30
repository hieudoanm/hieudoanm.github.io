import { render, screen } from '@solidjs/testing-library';
import { FrequentlyAskedQuestions } from '../FrequentlyAskedQuestions';

describe('FrequentlyAskedQuestions', () => {
  it('renders section label', () => {
    render(() => <FrequentlyAskedQuestions />);
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders heading', () => {
    render(() => <FrequentlyAskedQuestions />);
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument();
  });

  it('renders all four questions', () => {
    render(() => <FrequentlyAskedQuestions />);
    expect(screen.getByText(/What tokens does Forma/)).toBeInTheDocument();
    expect(screen.getByText(/Is it framework-agnostic/)).toBeInTheDocument();
    expect(
      screen.getByText(/How are accessibility levels/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Can I use Forma/)).toBeInTheDocument();
  });
});
