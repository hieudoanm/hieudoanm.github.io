import { fireEvent, render, screen } from '@testing-library/react';
import { Swatch } from '../Swatch';

describe('Swatch', () => {
  it('renders the hex value', () => {
    render(<Swatch hex="#ff0030" copied={false} onCopy={jest.fn()} />);
    expect(screen.getByText('#ff0030')).toBeInTheDocument();
  });

  it('calls onCopy with the hex when clicked', () => {
    const onCopy = jest.fn();
    render(<Swatch hex="#ff0030" copied={false} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy #ff0030' }));
    expect(onCopy).toHaveBeenCalledWith('#ff0030');
  });

  it('shows a check icon when copied', () => {
    render(<Swatch hex="#ff0030" copied onCopy={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Copy #ff0030' })
    ).toBeInTheDocument();
  });
});
