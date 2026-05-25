import { render } from '@testing-library/react';
import { BreakingBadModal } from '../BreakingBadModal';

describe('BreakingBadModal', () => {
  it('should render', () => {
    const { container } = render(<BreakingBadModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
