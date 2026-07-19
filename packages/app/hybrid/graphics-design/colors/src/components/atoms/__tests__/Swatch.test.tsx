import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Swatch } from '../Swatch';

describe('Swatch', () => {
  it('renders the hex value', () => {
    render(<Swatch hex="#ff0000" copied={false} onCopy={() => {}} />);
    expect(screen.getByText('#ff0000')).toBeInTheDocument();
  });

  it('has an accessible copy label', () => {
    render(<Swatch hex="#ff0000" copied={false} onCopy={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'Copy #ff0000' })
    ).toBeInTheDocument();
  });

  it('calls onCopy with the hex on click', async () => {
    const onCopy = jest.fn();
    const user = userEvent.setup();
    render(<Swatch hex="#00ff00" copied={false} onCopy={onCopy} />);
    await user.click(screen.getByRole('button', { name: 'Copy #00ff00' }));
    expect(onCopy).toHaveBeenCalledWith('#00ff00');
  });
});
