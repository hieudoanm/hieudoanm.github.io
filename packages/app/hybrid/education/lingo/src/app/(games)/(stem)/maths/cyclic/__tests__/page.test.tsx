import { render, screen } from '@testing-library/react';
import CyclicNumberPage from '@/app/(games)/(stem)/maths/cyclic/page';

describe('CyclicNumberPage', () => {
  it('renders the cyclic number game inside a tool shell', () => {
    render(<CyclicNumberPage />);
    expect(screen.getByText('142857')).toBeInTheDocument();
    expect(screen.getByText('The cyclic number')).toBeInTheDocument();
  });
});
