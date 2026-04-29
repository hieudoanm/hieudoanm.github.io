import { render } from '@testing-library/react';
import { IPModal } from '../IPModal';

describe('IPModal', () => {
  it('should render', () => {
    const { container } = render(<IPModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
