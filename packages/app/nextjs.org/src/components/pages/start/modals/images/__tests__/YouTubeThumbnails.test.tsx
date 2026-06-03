import { render } from '@testing-library/react';
import { YouTubeThumbnailsModal } from '../YouTubeThumbnailsModal';

describe('YouTubeThumbnailsModal', () => {
  it('should render', () => {
    const { container } = render(
      <YouTubeThumbnailsModal onClose={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});
