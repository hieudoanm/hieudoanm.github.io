import { render } from '@testing-library/react';
import { T3Modal } from '../T3Modal';

describe('T3Modal', () => {
  it('should render', () => {
    const { container } = render(<T3Modal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
