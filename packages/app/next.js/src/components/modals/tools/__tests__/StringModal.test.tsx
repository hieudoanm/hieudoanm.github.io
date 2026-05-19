import { render } from '@testing-library/react';
import { StringModal } from '../StringModal';

describe('StringModal', () => {
  it('should render', () => {
    const { container } = render(<StringModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
