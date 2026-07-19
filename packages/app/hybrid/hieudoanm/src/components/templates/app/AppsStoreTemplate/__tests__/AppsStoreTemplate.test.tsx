import { fireEvent, render, screen } from '@testing-library/react';
import { PiStarFour } from 'react-icons/pi';
import { AppsStoreTemplate } from '../AppsStoreTemplate';

const sections = [
  {
    label: 'Utilities',
    items: [
      {
        label: 'Calculator',
        description: 'Arithmetic',
        icon: PiStarFour,
        href: '/apps/utilities/calculator',
      },
      {
        label: 'Pomodoro',
        description: 'Timer',
        icon: PiStarFour,
        href: '/apps/clocks/pomodoro',
      },
    ],
  },
];

describe('AppsStoreTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <AppsStoreTemplate title="Apps" sections={sections} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the title', () => {
    render(<AppsStoreTemplate title="Apps" sections={sections} />);
    expect(screen.getAllByText('Apps').length).toBeGreaterThan(0);
  });

  it('renders sections and items', () => {
    render(<AppsStoreTemplate title="Apps" sections={sections} />);
    expect(screen.getAllByText('Utilities').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Calculator').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pomodoro').length).toBeGreaterThan(0);
  });

  it('filters items by query', () => {
    render(<AppsStoreTemplate title="Apps" sections={sections} />);
    fireEvent.change(screen.getAllByPlaceholderText('Search or filter…')[0], {
      target: { value: 'pomodoro' },
    });
    expect(screen.getAllByText('Pomodoro').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Calculator').length).toBe(0);
  });

  it('shows the no results message when nothing matches', () => {
    render(<AppsStoreTemplate title="Apps" sections={sections} />);
    fireEvent.change(screen.getAllByPlaceholderText('Search or filter…')[0], {
      target: { value: 'zzz' },
    });
    expect(screen.getAllByText(/No results match/).length).toBeGreaterThan(0);
  });
});
