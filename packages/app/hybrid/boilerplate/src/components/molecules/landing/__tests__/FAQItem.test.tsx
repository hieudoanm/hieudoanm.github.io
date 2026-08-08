import { fireEvent, render, screen } from '@testing-library/react';
import { FAQItem } from '../FAQItem';

describe('FAQItem', () => {
  it('renders the question and answer', () => {
    render(<FAQItem question="What is Next.js?" answer="A React framework." />);
    expect(screen.getByText('What is Next.js?')).toBeInTheDocument();
    expect(screen.getByText('A React framework.')).toBeInTheDocument();
  });

  it('starts collapsed', () => {
    render(<FAQItem question="Q?" answer="A." />);
    const toggle = screen.getByLabelText('Q?') as HTMLInputElement;
    expect(toggle.checked).toBe(false);
  });

  it('toggles open and closed on click', () => {
    render(<FAQItem question="Q?" answer="A." />);
    const toggle = screen.getByLabelText('Q?') as HTMLInputElement;
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(true);
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(false);
  });

  it('starts open when defaultOpen is set', () => {
    render(<FAQItem question="Q?" answer="A." defaultOpen />);
    const toggle = screen.getByLabelText('Q?') as HTMLInputElement;
    expect(toggle.checked).toBe(true);
  });
});
