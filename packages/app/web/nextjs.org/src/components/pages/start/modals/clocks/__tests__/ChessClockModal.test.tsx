import { render } from '@testing-library/react';
import { ChessClockModal } from '../ChessClockModal';

describe('ChessClockModal', () => {
  it('should render', () => {
    const { container } = render(<ChessClockModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
