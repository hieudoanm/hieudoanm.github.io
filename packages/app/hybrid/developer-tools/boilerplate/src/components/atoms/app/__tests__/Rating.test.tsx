import { fireEvent, render, screen } from '@testing-library/react';
import { Rating } from '../Rating';

describe('Rating', () => {
  it('renders read-only stars with filled count', () => {
    render(<Rating value={3} />);
    expect(screen.getAllByLabelText(/filled/)).toHaveLength(3);
    expect(screen.getAllByLabelText(/empty/)).toHaveLength(2);
  });

  it('clamps value to max', () => {
    render(<Rating value={8} max={5} />);
    expect(screen.getAllByLabelText(/filled/)).toHaveLength(5);
  });

  it('calls onChange with star index when interactive', () => {
    const onChange = jest.fn();
    render(<Rating value={2} onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[4]);
    expect(onChange).toHaveBeenCalledWith(5);
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
  });

  it('handles invalid max', () => {
    render(<Rating value={1} max={0} />);
    expect(screen.getAllByLabelText(/filled/)).toHaveLength(1);
  });
});
