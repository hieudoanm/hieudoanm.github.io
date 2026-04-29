import { render } from '@testing-library/react';
import { EmojisModal } from '../EmojisModal';

describe('EmojisModal', () => {
  it('should render', () => {
    const { container } = render(<EmojisModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
