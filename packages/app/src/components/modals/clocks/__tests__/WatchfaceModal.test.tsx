import { render } from '@testing-library/react';
import { WatchFaceModal } from '../WatchfaceModal';

describe('WatchFaceModal', () => {
  it('should render', () => {
    const { container } = render(<WatchFaceModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
