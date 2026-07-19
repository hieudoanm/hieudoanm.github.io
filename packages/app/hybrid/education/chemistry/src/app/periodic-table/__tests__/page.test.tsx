import { render, screen } from '@testing-library/react';
import PeriodicTablePage from '@/app/periodic-table/page';

describe('PeriodicTablePage', () => {
  it('Tool page renders inside a tool shell', () => {
    render(<PeriodicTablePage />);
    expect(screen.getAllByTitle('Hydrogen').length).toBeGreaterThan(0);
  });
});
