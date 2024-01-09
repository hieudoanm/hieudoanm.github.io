import { CalendarPage } from '@hieudoanm/pages/apps/calendar';
import { render } from '@testing-library/react';

describe('CalendarPage', () => {
  test('render default', () => {
    const wrapper = render(<CalendarPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
