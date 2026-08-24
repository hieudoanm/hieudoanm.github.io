import { render, screen } from '@testing-library/react';
import { FooterNote } from '../FooterNote';

describe('FooterNote', () => {
  it('renders instruction text', () => {
    render(<FooterNote />);
    expect(screen.getByText(/amber-outlined/)).toBeInTheDocument();
    expect(screen.getByText(/Click any/)).toBeInTheDocument();
  });
});
