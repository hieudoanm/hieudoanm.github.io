import { render } from '@testing-library/react';
import { FlashcardsModal } from '../FlashcardsModal';

describe('FlashcardsModal', () => {
  it('should render', () => {
    const { container } = render(<FlashcardsModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
