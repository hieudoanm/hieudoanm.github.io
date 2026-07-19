import { render, screen } from '@testing-library/react';
import { AnalysisSection } from '../Analysis';
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

describe('AnalysisSection', () => {
  it('shows loading spinner when dbLoading', () => {
    const { container } = render(
      <AnalysisSection
        analysis={null}
        dbLoading={true}
        titleCounts={{}}
        histogram={{}}
      />
    );
    expect(container.querySelector('.loading')).toBeTruthy();
  });

  it('shows no data when analysis is null', () => {
    render(
      <AnalysisSection
        analysis={null}
        dbLoading={false}
        titleCounts={{}}
        histogram={{}}
      />
    );
    expect(screen.getByText('No data available.')).toBeTruthy();
  });

  it('renders title sections when analysis provided', () => {
    const analysis: Analysis = {
      count: { GM: 100, IM: 200, FM: 300, CM: 400, NM: 500 },
      histogram: {
        GM: {
          rapid: { '0-1000': 6 },
          blitz: { '0-1000': 8 },
          bullet: { '0-1000': 10 },
        },
        IM: {
          rapid: { '0-1000': 3 },
          blitz: { '0-1000': 4 },
          bullet: { '0-1000': 5 },
        },
        FM: {
          rapid: { '0-1000': 1 },
          blitz: { '0-1000': 2 },
          bullet: { '0-1000': 3 },
        },
        CM: {
          rapid: { '0-1000': 0 },
          blitz: { '0-1000': 1 },
          bullet: { '0-1000': 2 },
        },
        NM: {
          rapid: { '0-1000': 0 },
          blitz: { '0-1000': 0 },
          bullet: { '0-1000': 1 },
        },
      },
    };
    render(
      <AnalysisSection
        analysis={analysis}
        dbLoading={false}
        titleCounts={{ GM: 100, IM: 200 }}
        histogram={analysis.histogram}
      />
    );
    expect(screen.getByText('Open Titles')).toBeTruthy();
    expect(screen.getByText("Women's Titles")).toBeTruthy();
  });
});
