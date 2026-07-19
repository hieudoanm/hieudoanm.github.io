import { render } from '@testing-library/react';
import { Divider } from '../Divider';

describe('Divider', () => {
  it('renders a divider with label', () => {
    const { container } = render(<Divider label="OR" />);
    expect(container.querySelector('.divider')).toHaveTextContent('OR');
  });

  it('applies custom className', () => {
    const { container } = render(<Divider className="my-4" />);
    expect(container.querySelector('.divider')).toHaveClass('my-4');
  });
});
