import { render, screen } from '@testing-library/react';
import { Window } from '../Window';

describe('Window', () => {
  it('to match screenshot', () => {
    const { container } = render(<Window />);
    expect(container).toMatchSnapshot();
  });

  it('renders children', () => {
    render(
      <Window>
        <p>Window content</p>
      </Window>
    );
    expect(screen.getByText('Window content')).toBeInTheDocument();
  });

  it('renders empty when no children', () => {
    const { container } = render(<Window />);
    expect(container.querySelector('.mockup-window')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Window className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
