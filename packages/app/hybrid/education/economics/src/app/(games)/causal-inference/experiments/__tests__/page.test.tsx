import ExperimentsPage from '@/app/(games)/causal-inference/experiments/page';
import { render, screen } from '@testing-library/react';

describe('ExperimentsPage', () => {
  it('renders the causation challenge', () => {
    render(<ExperimentsPage />);
    expect(
      screen.getByRole('heading', { name: /Causation Challenge/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('scenario')).toBeInTheDocument();
  });
});
