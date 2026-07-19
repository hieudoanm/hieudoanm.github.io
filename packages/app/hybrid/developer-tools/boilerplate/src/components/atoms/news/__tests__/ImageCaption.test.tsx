import { render, screen } from '@testing-library/react';
import { ImageCaption } from '../ImageCaption';

describe('ImageCaption', () => {
  it('renders the caption text', () => {
    render(<ImageCaption>Protesters gather downtown</ImageCaption>);
    expect(screen.getByTestId('image-caption')).toHaveTextContent(
      'Protesters gather downtown'
    );
  });

  it('renders credit when provided', () => {
    render(
      <ImageCaption credit="AP Photo">Protesters gather downtown</ImageCaption>
    );
    expect(screen.getByTestId('image-caption')).toHaveTextContent('AP Photo');
  });

  it('renders without credit when omitted', () => {
    render(<ImageCaption>Protesters gather downtown</ImageCaption>);
    expect(screen.getByTestId('image-caption')).not.toHaveTextContent(
      'AP Photo'
    );
  });
});
