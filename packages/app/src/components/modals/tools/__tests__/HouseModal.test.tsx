import { render } from '@testing-library/react';
import { HouseModal } from '../HouseModal';

describe('HouseModal', () => {
  it('should render', () => {
    const { container } = render(<HouseModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
