import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { DateTimeTab } from '../index';

jest.mock('../WorldClock', () => ({
  WorldClock: () => <div data-testid="world-clock" />,
}));

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

const renderWithQuery = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('DateTimeTab', () => {
  it('should render all sections', () => {
    const { container } = renderWithQuery(<DateTimeTab times={['12:00:00']} />);
    expect(container).toMatchSnapshot();
  });
});
