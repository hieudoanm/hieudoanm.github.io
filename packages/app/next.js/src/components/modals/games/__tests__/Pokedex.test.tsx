import { render } from '@testing-library/react';
import { BlackjackModal } from '../BlackjackModal';

describe('BlackjackModal', () => {
  it('should render', () => {
    const { container } = render(<BlackjackModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
