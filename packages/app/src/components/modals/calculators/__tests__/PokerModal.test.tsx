import { render } from '@testing-library/react';
import { PokerModal } from '../PokerModal';

describe('PokerModal', () => {
  it('should render', () => {
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
