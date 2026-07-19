import { render } from '@testing-library/react';
import { HistogramBar } from '../HistogramBar';
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

describe('HistogramBar', () => {
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
  };

  it('renders chart with title', () => {
    const { container } = render(
      <HistogramBar
        histogram={histogram}
        title="Bullet Distribution"
        timeControl="bullet"
        titleKeys={['GM', 'IM']}
      />
    );
    expect(container.textContent).toContain('Bullet Distribution');
  });
});
