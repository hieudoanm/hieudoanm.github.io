import { render } from '@testing-library/react';
import { CountdownModal } from '../CountdownModal';

describe('CountdownModal', () => {
  it('should render', () => {
    const { container } = render(<CountdownModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
