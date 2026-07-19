import { render, screen } from '@testing-library/react';
import { TitleSection } from '../TitleSection';
import type { Analysis } from '../../types';

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="chart" />,
}));

jest.mock('chart.js', () => ({
  Chart: { register: jest.fn() },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  BarElement: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

describe('TitleSection', () => {
  const histogram: Analysis['histogram'] = {
    GM: {
      bullet: { '0-1000': 10 },
      blitz: { '0-1000': 8 },
      rapid: { '0-1000': 6 },
    },
    IM: {
      bullet: { '0-1000': 5 },
      blitz: { '0-1000': 4 },
      rapid: { '0-1000': 3 },
    },
    FM: {
      bullet: { '0-1000': 3 },
      blitz: { '0-1000': 2 },
      rapid: { '0-1000': 1 },
    },
  };

  it('renders heading and stat cards', () => {
    render(
      <TitleSection
        heading="Open Titles"
        titleKeys={['GM', 'IM', 'FM']}
        counts={{ GM: 100, IM: 200 }}
        histogram={histogram}
      />
    );
    expect(screen.getByText('Open Titles')).toBeTruthy();
    expect(screen.getByText('100')).toBeTruthy();
    expect(screen.getByText('200')).toBeTruthy();
  });

  it('skips titles with no count', () => {
    render(
      <TitleSection
        heading="Test"
        titleKeys={['GM', 'FM']}
        counts={{ GM: 50 }}
        histogram={histogram}
      />
    );
    expect(screen.getByText('50')).toBeTruthy();
    expect(screen.queryByText('0')).toBeNull();
  });
});
