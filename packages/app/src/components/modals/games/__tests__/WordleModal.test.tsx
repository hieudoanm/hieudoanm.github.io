import { render } from '@testing-library/react';
import { WordleModal } from '../WordleModal';

describe('WordleModal', () => {
  it('should render', () => {
    const { container } = render(<WordleModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
