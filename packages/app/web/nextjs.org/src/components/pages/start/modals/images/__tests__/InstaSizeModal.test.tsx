import { render } from '@testing-library/react';
import { InstaSizeModal } from '../InstaSizeModal';

describe('InstaSizeModal', () => {
  it('should render', () => {
    const { container } = render(<InstaSizeModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
