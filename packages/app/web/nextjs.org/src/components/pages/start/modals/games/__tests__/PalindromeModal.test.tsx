import { render } from '@testing-library/react';
import { PalindromeModal } from '../PalindromeModal';

describe('PalindromeModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    const { container } = render(<PalindromeModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
