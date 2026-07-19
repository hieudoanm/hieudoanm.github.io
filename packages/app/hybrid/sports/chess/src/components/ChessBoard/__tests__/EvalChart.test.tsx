import { render } from '@testing-library/react';
import { EvalChart } from '../components/EvalChart';

jest.mock('chart.js', () => ({
  Chart: { register: jest.fn() },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  PointElement: jest.fn(),
  LineElement: jest.fn(),
  Tooltip: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

describe('EvalChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <EvalChart
        points={[
          { moveNumber: 0, san: 'Start', evalCp: 0 },
          { moveNumber: 1, san: 'e4', evalCp: 30 },
        ]}
      />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with multiple points', () => {
    const { container } = render(
      <EvalChart
        points={[
          { moveNumber: 0, san: 'Start', evalCp: 0 },
          { moveNumber: 1, san: 'e4', evalCp: 50 },
          { moveNumber: 2, san: 'e5', evalCp: -20 },
          { moveNumber: 3, san: 'Nf3', evalCp: 100 },
        ]}
      />
    );
    expect(container.firstChild).toBeTruthy();
  });
});
