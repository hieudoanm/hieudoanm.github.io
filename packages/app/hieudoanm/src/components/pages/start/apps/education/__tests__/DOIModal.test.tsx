import { render } from '@testing-library/react';
import { DOIModal } from '../DOIModal';

describe('DOIModal', () => {
  it('should render', () => {
    const { container } = render(<DOIModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
