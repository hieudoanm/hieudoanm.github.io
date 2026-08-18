import { render, screen } from '@testing-library/react';
import TumblingEPage from '@/app/(app)/tumbling-e/page';

describe('TumblingEPage', () => {
  it('renders a fullscreen chart', () => {
    render(<TumblingEPage />);
    expect(screen.getByText(/Tumbling E Visual Acuity/)).toBeInTheDocument();
  });
});
