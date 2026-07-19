import { render } from '@testing-library/react';
import { Pi } from '../PiNumber';

describe('Pi', () => {
  it('should render', () => {
    const { container } = render(<Pi onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
