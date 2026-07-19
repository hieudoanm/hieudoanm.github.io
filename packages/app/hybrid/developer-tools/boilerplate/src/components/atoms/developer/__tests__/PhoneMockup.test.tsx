import { render, screen } from '@testing-library/react';
import { PhoneMockup } from '../PhoneMockup';

describe('PhoneMockup', () => {
  it('renders children and a camera by default', () => {
    const { container } = render(<PhoneMockup>Screen</PhoneMockup>);
    expect(screen.getByText('Screen')).toBeInTheDocument();
    expect(container.querySelector('.camera')).toBeInTheDocument();
  });

  it('hides the camera when disabled', () => {
    const { container } = render(
      <PhoneMockup camera={false}>Screen</PhoneMockup>
    );
    expect(container.querySelector('.camera')).not.toBeInTheDocument();
  });
});
