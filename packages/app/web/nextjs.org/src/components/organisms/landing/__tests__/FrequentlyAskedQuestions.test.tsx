import { render, screen } from '@testing-library/react';
import { FrequentlyAskedQuestions } from '../FrequentlyAskedQuestions';

describe('FrequentlyAskedQuestions', () => {
  it('to match snapshot', () => {
    const { container } = render(<FrequentlyAskedQuestions />);
    expect(container).toMatchSnapshot();
  });

  it('renders section heading', () => {
    render(<FrequentlyAskedQuestions />);
    expect(screen.getByText(/faq/i)).toBeInTheDocument();
    expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument();
  });

  it('renders all questions', () => {
    render(<FrequentlyAskedQuestions />);
    expect(
      screen.getByText(/What tokens does Forma export/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Is it framework-agnostic/)).toBeInTheDocument();
    expect(screen.getByText(/accessibility levels tested/)).toBeInTheDocument();
    expect(
      screen.getByText(/Can I use Forma in a commercial project/)
    ).toBeInTheDocument();
  });

  it('renders all answers', () => {
    render(<FrequentlyAskedQuestions />);
    expect(screen.getByText(/CSS custom properties/)).toBeInTheDocument();
    expect(screen.getByText(/framework-agnostic/i)).toBeInTheDocument();
    expect(screen.getByText(/axe-core tests/)).toBeInTheDocument();
    expect(screen.getByText(/MIT licensed/)).toBeInTheDocument();
  });
});
