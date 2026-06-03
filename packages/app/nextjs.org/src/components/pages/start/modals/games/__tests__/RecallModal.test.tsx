import { render } from '@testing-library/react';
import { RecallModal } from '../RecallModal';

describe('RecallModal', () => {
  it('should render', () => {
    const { container } = render(<RecallModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
