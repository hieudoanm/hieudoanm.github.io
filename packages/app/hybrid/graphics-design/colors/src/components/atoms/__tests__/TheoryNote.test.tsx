import { render, screen } from '@testing-library/react';
import { TheoryNote } from '../TheoryNote';

describe('TheoryNote', () => {
  it('renders the title', () => {
    render(<TheoryNote title="Why it matters">Some explanation</TheoryNote>);
    expect(screen.getByText('Why it matters')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<TheoryNote title="Why it matters">Some explanation</TheoryNote>);
    expect(screen.getByText('Some explanation')).toBeInTheDocument();
  });
});
