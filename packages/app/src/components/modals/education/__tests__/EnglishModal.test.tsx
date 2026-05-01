import { render } from '@testing-library/react';
import { EnglishModal } from '../EnglishModal';

describe('EnglishModal', () => {
  it('should render', () => {
    const { container } = render(<EnglishModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
