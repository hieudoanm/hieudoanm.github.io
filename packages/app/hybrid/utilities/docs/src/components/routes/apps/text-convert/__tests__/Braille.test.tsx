import { render } from '@testing-library/react';
import { Braille } from '../Braille';

describe('Braille', () => {
  it('should render', () => {
    const { container } = render(<Braille onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
