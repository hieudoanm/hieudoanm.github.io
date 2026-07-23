import { render } from '@testing-library/react';
import { Pitch } from '../PitchModal';

describe('Pitch', () => {
  it('should render', () => {
    const { container } = render(<Pitch onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
