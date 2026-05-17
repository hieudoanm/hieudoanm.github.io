import { render, screen } from '@testing-library/react';
import { Dot } from '../Dot';

describe('Dot', () => {
  it('renders empty dot for index 0', () => {
    const { container } = render(<Dot index={0} date={new Date()} />);
    expect(container.querySelector('.bg-base-content\\/5')).toBeInTheDocument();
  });

  it('renders today dot with ping animation', () => {
    const today = new Date();
    const { container } = render(<Dot index={1} date={today} />);
    expect(container.querySelector('.animate-ping')).toBeInTheDocument();
  });

  it('renders past dot', () => {
    const past = new Date('2020-01-01');
    const { container } = render(<Dot index={1} date={past} />);
    expect(
      container.querySelector('.bg-base-content\\/75')
    ).toBeInTheDocument();
  });

  it('renders future dot', () => {
    const future = new Date('2099-01-01');
    const { container } = render(<Dot index={1} date={future} />);
    expect(
      container.querySelector('.border-base-content\\/50')
    ).toBeInTheDocument();
  });
});
