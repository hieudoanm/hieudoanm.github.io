import { render, screen } from '@testing-library/react';

import ReasoningPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/page';

describe('ReasoningPage', () => {
  it('renders the note title', () => {
    render(<ReasoningPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Reasoning' })
    ).toBeInTheDocument();
  });

  it('renders the first section', () => {
    render(<ReasoningPage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Reasoning is inference under constraint',
      })
    ).toBeInTheDocument();
  });

  it('separates deduction from induction', () => {
    render(<ReasoningPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Deductive inference' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Inductive inference and heuristics',
      })
    ).toBeInTheDocument();
  });

  it('links back to the cognitive hub', () => {
    render(<ReasoningPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Cognitive Psychology' })
    ).toHaveAttribute('href', '/psychology/cognitive');
  });

  it('links to the cognitive bias reference', () => {
    render(<ReasoningPage />);

    expect(
      screen.getByRole('link', { name: 'Wikipedia: Cognitive Bias' })
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Cognitive_bias');
  });
});
