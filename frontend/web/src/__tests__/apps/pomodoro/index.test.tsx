import { PomodoroPage } from '@hieudoanm/pages/apps/pomodoro';
import { render } from '@testing-library/react';

describe('PomodoroPage', () => {
  test('render default', () => {
    const { container } = render(<PomodoroPage />);
    expect(container).toMatchSnapshot();
  });
});
