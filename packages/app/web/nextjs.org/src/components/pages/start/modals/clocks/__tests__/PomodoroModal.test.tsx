import { render } from '@testing-library/react';
import { PomodoroModal } from '../PomodoroModal';

describe('PomodoroModal', () => {
  it('should render', () => {
    const { container } = render(<PomodoroModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
