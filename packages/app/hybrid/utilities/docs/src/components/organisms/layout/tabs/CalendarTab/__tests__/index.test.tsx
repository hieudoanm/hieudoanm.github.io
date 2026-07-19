import { render } from '@testing-library/react';
import { CalendarTab } from '../index';

jest.mock('../CalendarGrid', () => ({
  CalendarGrid: () => <div data-testid="calendar-grid" />,
}));

jest.mock('../CalendarHeader', () => ({
  CalendarHeader: () => <div data-testid="calendar-header" />,
}));

jest.mock('../LunarDate', () => ({
  LunarDate: () => <div data-testid="lunar-date" />,
}));

jest.mock('../EventList', () => ({
  EventList: () => <div data-testid="event-list" />,
}));

describe('CalendarTab', () => {
  it('should render all sections', () => {
    const { container } = render(<CalendarTab />);
    expect(container).toMatchSnapshot();
  });
});
