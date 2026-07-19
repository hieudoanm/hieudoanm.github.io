import { render, screen } from '@testing-library/react';
import { Phone } from '../Phone';

describe('Phone', () => {
  it('to match snapshot', () => {
    const { container } = render(<Phone />);
    expect(container).toMatchSnapshot();
  });

  it('renders camera notch', () => {
    const { container } = render(<Phone />);
    expect(container.querySelector('.mockup-phone-camera')).toBeInTheDocument();
  });

  it('renders display area', () => {
    const { container } = render(<Phone />);
    expect(
      container.querySelector('.mockup-phone-display')
    ).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Phone>
        <p>App content</p>
      </Phone>
    );
    expect(screen.getByText('App content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Phone className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
