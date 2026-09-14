import { render, screen } from '@testing-library/react';
import OphthalmologyPage from '@/app/(games)/ophthalmology/page';

describe('OphthalmologyPage', () => {
  it('renders the hub heading and vision card', () => {
    render(<OphthalmologyPage />);
    expect(
      screen.getByRole('heading', { name: 'Ophthalmology' })
    ).toBeInTheDocument();
    const vision = screen.getByTestId('ophthalmology-vision');
    expect(vision).toHaveTextContent('Vision');
    expect(vision.getAttribute('href')).toContain('/ophthalmology/vision');
  });
});
