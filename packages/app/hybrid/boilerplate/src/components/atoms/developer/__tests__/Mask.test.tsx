import { render, screen } from '@testing-library/react';
import { Mask } from '../Mask';

describe('Mask', () => {
  it('renders an image with the shape class', () => {
    const { container } = render(
      <Mask src="/x.png" alt="Logo" shape="hexagon" />
    );
    const img = screen.getByRole('img', { name: 'Logo' });
    expect(img).toHaveAttribute('src', '/x.png');
    expect(img).toHaveClass('mask-hexagon');
    expect(container.querySelector('img')).toHaveClass('mask');
  });

  it('defaults to squircle', () => {
    render(<Mask src="/x.png" alt="Logo" />);
    expect(screen.getByRole('img', { name: 'Logo' })).toHaveClass(
      'mask-squircle'
    );
  });
});
