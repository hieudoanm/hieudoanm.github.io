import { render } from '@testing-library/react';
import { ColorsModal } from '../ColorsModal';

describe('ColorsModal', () => {
  it('should render', () => {
    const { container } = render(<ColorsModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
