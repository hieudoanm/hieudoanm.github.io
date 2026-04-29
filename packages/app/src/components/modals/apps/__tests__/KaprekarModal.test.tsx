import { render } from '@testing-library/react';
import { KaprekarModal } from '../KaprekarModal';

describe('KaprekarModal', () => {
  it('should render', () => {
    const { container } = render(<KaprekarModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
