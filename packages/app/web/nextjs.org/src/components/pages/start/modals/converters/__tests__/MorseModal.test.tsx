import { render } from '@testing-library/react';
import { MorseModal } from '../MorseModal';

describe('MorseModal', () => {
  it('should render', () => {
    const { container } = render(<MorseModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
