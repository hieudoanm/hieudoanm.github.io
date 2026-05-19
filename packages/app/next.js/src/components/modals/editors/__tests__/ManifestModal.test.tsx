import { render } from '@testing-library/react';
import { ManifestModal } from '../ManifestModal';

describe('ManifestModal', () => {
  it('should render', () => {
    const { container } = render(<ManifestModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
