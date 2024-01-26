import CalendarPage from '@mini/app/calendar/page';
import { render } from '@testing-library/react';

describe('CalendarPage', () => {
  test('render default', () => {
    const wrapper = render(
      <CalendarPage params={{ date: 4, month: 11, year: 1995 }} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
