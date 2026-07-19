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
        href: '/utilities/calculator',
        type: 'App',
        typeId: 'app',
      },
      {
        label: 'Pomodoro',
        description: 'Timer',
        icon: PiStarFour,
        href: '/clocks/pomodoro',
        type: 'Bookmark',
        typeId: 'bookmark',
      },
    ],
  },
];

describe('AppsStoreTemplate', () => {
  it('to match snapshot', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-07-31T12:00:00.000Z'));
    try {
      const { container } = render(
        <AppsStoreTemplate title="Apps" sections={sections} />
      );
      expect(container).toMatchSnapshot();
    } finally {
      jest.useRealTimers();
    }
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

  it('collapses and expands a section', () => {
    render(<AppsStoreTemplate title="Apps" sections={sections} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
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

  it('renders a type filter for each distinct type', () => {
    render(<AppsStoreTemplate title="Apps" sections={sections} />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'App' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Bookmark' })
    ).toBeInTheDocument();
  });

  it('filters items by type', () => {
    render(<AppsStoreTemplate title="Apps" sections={sections} />);
    fireEvent.click(screen.getByRole('button', { name: 'App' }));
    expect(screen.getAllByText('Calculator').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Pomodoro').length).toBe(0);
  });

  it('deselects a type filter to restore items', () => {
    render(<AppsStoreTemplate title="Apps" sections={sections} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bookmark' }));
    expect(screen.queryAllByText('Calculator').length).toBe(0);
    expect(screen.getAllByText('Pomodoro').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Bookmark' }));
    expect(screen.getAllByText('Calculator').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pomodoro').length).toBeGreaterThan(0);
  });

  it('resets type filters via the All button', () => {
    render(<AppsStoreTemplate title="Apps" sections={sections} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bookmark' }));
    expect(screen.queryAllByText('Calculator').length).toBe(0);
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getAllByText('Calculator').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pomodoro').length).toBeGreaterThan(0);
  });
});
