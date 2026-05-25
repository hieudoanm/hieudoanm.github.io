import { render } from '@testing-library/react';
import { PitchModal } from '../PitchModal';

describe('PitchModal', () => {
  it('should render', () => {
    const { container } = render(<PitchModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
