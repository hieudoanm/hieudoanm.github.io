import { render, screen } from '@testing-library/react';
import TemperaturePage from '@/app/(games)/(arts)/colors/perception/temperature/page';

describe('TemperaturePage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<TemperaturePage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color & Perception' })
    ).toHaveAttribute('href', '/colors/perception');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Color Temperature' })
    ).toBeInTheDocument();
  });
});
