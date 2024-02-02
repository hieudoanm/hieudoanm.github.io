import PomodoroPage from '@sunil/app/pomodoro/page';
import { render } from '@testing-library/react';

describe('PomodoroPage', () => {
  test('render default', () => {
    const { container } = render(<PomodoroPage />);
    expect(container).toMatchSnapshot();
  });
});
