import { render, screen } from '@testing-library/react';
import ChemistryPage from '@/app/(games)/chemistry/periodic-table/page';

describe('ChemistryPage', () => {
  it('renders a periodic table inside a tool shell', () => {
    render(<ChemistryPage />);
    expect(screen.getAllByTitle('Hydrogen').length).toBeGreaterThan(0);
  });
});
