import { render, screen } from '@testing-library/react';
import { Hover3D } from '../Hover3D';

describe('Hover3D', () => {
  it('wraps children in a hover-3d container', () => {
    render(<Hover3D>Card</Hover3D>);
    expect(screen.getByText('Card')).toHaveClass('hover-3d');
  });
});
