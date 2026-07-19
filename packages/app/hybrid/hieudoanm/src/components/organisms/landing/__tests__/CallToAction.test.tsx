import { fireEvent, render, screen } from '@testing-library/react';
import { CallToAction } from '../CallToAction';

describe('CallToAction', () => {
  it('to match snapshot', () => {
    const { container } = render(<CallToAction />);
    expect(container).toMatchSnapshot();
  });

  it('renders heading and description', () => {
    render(<CallToAction />);
    expect(screen.getByText(/ready to build/i)).toBeInTheDocument();
    expect(screen.getByText(/free forever/i)).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<CallToAction />);
    expect(
      screen.getByRole('button', { name: /start building/i })
    ).toBeInTheDocument();
  });

  it('calls onStartClick when button clicked', () => {
    const onClick = jest.fn();
    render(<CallToAction onStartClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /start building/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
