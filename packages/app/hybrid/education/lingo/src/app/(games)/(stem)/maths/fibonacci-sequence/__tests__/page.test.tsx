import { render, screen } from '@testing-library/react';

import FibonacciSequencePage from '@/app/(games)/(stem)/maths/fibonacci-sequence/page';

describe('FibonacciSequencePage', () => {
  it('renders the Fibonacci game', () => {
    render(<FibonacciSequencePage />);
    expect(screen.getByLabelText('Term index')).toBeInTheDocument();
    expect(screen.getByText('Terms to double')).toBeInTheDocument();
  });
});
