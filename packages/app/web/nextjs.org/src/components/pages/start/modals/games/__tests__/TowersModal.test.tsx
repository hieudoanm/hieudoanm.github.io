import { render } from '@testing-library/react';
import { TowersModal } from '../TowersModal';

describe('TowersModal', () => {
  it('should render', () => {
    const { container } = render(<TowersModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
