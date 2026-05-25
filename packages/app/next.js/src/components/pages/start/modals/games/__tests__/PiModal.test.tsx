import { render } from '@testing-library/react';
import { PiModal } from '../PiNumberModal';

describe('PiModal', () => {
  it('should render', () => {
    const { container } = render(<PiModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
