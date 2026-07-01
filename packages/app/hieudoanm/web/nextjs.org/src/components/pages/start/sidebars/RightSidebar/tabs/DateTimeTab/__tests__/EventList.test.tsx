import { render } from '@testing-library/react';
import { EventList } from '../EventList';

describe('EventList', () => {
  it('should render empty state', () => {
    const { container } = render(<EventList events={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should render events', () => {
    const { container } = render(
      <EventList
        events={[
          {
            title: 'New Year',
            field: 'Public Holiday',
            date: 1,
            month: 1,
            year: 2026,
            frequency: 'annual' as const,
            type: 'holiday',
            country: 'International',
          },
          {
            title: 'Test Event',
            field: 'Test Field',
            date: 15,
            month: 6,
            year: 2026,
            frequency: 'annual' as const,
            type: 'other',
            country: 'US',
          },
        ]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
