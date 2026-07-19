import { fireEvent, render, screen } from '@testing-library/react';
import { Carousel } from '../Carousel';

describe('Carousel', () => {
  const slides = [<div key="1">Slide one</div>, <div key="2">Slide two</div>];
  const scrollBy = jest.fn();

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
      configurable: true,
      value: scrollBy,
    });
  });

  it('renders slides and controls', () => {
    render(<Carousel slides={slides} ariaLabel="Highlights" />);
    expect(screen.getByLabelText('Highlights')).toBeInTheDocument();
    expect(screen.getByText('Slide one')).toBeInTheDocument();
    expect(screen.getByText('Slide two')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous slide' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next slide' })
    ).toBeInTheDocument();
  });

  it('scrolls the track on control clicks', () => {
    render(<Carousel slides={slides} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(scrollBy).toHaveBeenCalledTimes(2);
  });
});
