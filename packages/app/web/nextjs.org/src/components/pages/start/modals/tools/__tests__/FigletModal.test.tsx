import { render } from '@testing-library/react';
import { FigletModal } from '../FigletModal';

describe('FigletModal', () => {
  it('should render', () => {
    const { container } = render(<FigletModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
