import { render, screen } from '@testing-library/react';
import { TestimonialMark } from '../TestimonialMark';

describe('TestimonialMark', () => {
  it('renders the quote and author with company', () => {
    render(
      <TestimonialMark
        name="Ada Lovelace"
        quote="Fantastic product."
        company="Analytical Engines"
      />
    );
    expect(screen.getByText('Fantastic product.')).toBeInTheDocument();
    expect(
      screen.getByText('Ada Lovelace, Analytical Engines')
    ).toBeInTheDocument();
  });

  it('renders the author without a company', () => {
    render(<TestimonialMark name="Grace Hopper" quote="Works great." />);
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
  });
});
