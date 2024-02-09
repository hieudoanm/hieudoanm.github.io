import { render } from '@testing-library/react';
import { CalendarTemplate } from '..';

describe('CalendarTemplate', () => {
  test('render default', () => {
    const wrapper = render(
      <CalendarTemplate year={1995} month={12} date={4} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
