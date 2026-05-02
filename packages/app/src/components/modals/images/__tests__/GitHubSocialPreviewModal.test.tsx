import { render } from '@testing-library/react';
import { GitHubSocialPreviewModal } from '../GitHubSocialPreviewModal';

describe('GitHubSocialPreviewModal', () => {
  it('should render', () => {
    const { container } = render(
      <GitHubSocialPreviewModal onClose={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});
