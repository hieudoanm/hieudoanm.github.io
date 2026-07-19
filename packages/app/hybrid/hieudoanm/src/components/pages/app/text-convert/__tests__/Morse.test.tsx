import { render } from '@testing-library/react';
import { Morse } from '../MorseModal';

describe('Morse', () => {
  it('should render', () => {
    const { container } = render(<Morse onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
