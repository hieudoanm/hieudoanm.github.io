import { render } from '@testing-library/react';
import { BrailleModal } from '../BrailleModal';

describe('BrailleModal', () => {
  it('should render', () => {
    const { container } = render(<BrailleModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
