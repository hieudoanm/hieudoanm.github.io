import { render, screen } from '@testing-library/react';

import LightsOutPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/lights-out/page';

describe('LightsOutPage', () => {
  it('names the exercise', () => {
    render(<LightsOutPage />);

    expect(
      screen.getByRole('heading', { name: 'Lights Out' })
    ).toBeInTheDocument();
  });

  it('describes what the exercise trains', () => {
    render(<LightsOutPage />);

    expect(
      screen.getByText(/planning under a reversal rule/i)
    ).toBeInTheDocument();
  });

  it('links back to the reasoning topic', () => {
    render(<LightsOutPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Reasoning' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning');
  });

  it('mounts the exercise inside the page', () => {
    render(<LightsOutPage />);

    expect(
      screen.getByRole('button', { name: 'New puzzle' })
    ).toBeInTheDocument();
  });
});
