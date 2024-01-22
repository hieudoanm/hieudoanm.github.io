import { CalendarPage } from '@hieudoanm/pages/apps/calendar';
import { render } from '@testing-library/react';

describe('CalendarPage', () => {
  test('render default', () => {
    const wrapper = render(<CalendarPage date={4} month={11} year={1995} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
