import { render } from '@testing-library/react';
import { Kbd } from '../Kbd';

describe('Kbd', () => {
  it('renders keyboard key text', () => {
    const { container } = render(<Kbd>Ctrl</Kbd>);
    expect(container.querySelector('kbd')).toHaveTextContent('Ctrl');
  });
});
