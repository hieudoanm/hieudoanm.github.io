import { render } from '@testing-library/react';
import { Pomodoro } from '..';

describe('Pomodoro', () => {
  test('render default', () => {
    const { container } = render(<Pomodoro />);
    expect(container).toMatchSnapshot();
  });
});
