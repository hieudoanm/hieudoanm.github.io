import { render, screen } from '@testing-library/react';
import { Artboard } from '../Artboard';

describe('Artboard', () => {
  it('renders a phone artboard with the default size', () => {
    render(<Artboard>Hello</Artboard>);
    expect(screen.getByRole('group')).toHaveClass(
      'artboard',
      'artboard-demo',
      'phone-1'
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies a custom size and uses the title as the accessible name', () => {
    render(
      <Artboard size="phone-4" title="Frame">
        Hi
      </Artboard>
    );
    expect(screen.getByRole('group', { name: 'Frame' })).toHaveClass('phone-4');
  });
});
