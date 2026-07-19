import { render, screen } from '@testing-library/react';
import { SymptomCard } from '../SymptomCard';

describe('SymptomCard', () => {
  it('renders symptom name and severity', () => {
    render(<SymptomCard name="Headache" severity="mild" />);
    expect(screen.getByText('Headache')).toBeInTheDocument();
    expect(screen.getByText('mild')).toHaveClass('badge-success');
  });

  it('renders moderate severity', () => {
    render(<SymptomCard name="Fever" severity="moderate" />);
    expect(screen.getByText('moderate')).toHaveClass('badge-warning');
  });

  it('renders severe severity', () => {
    render(<SymptomCard name="Chest pain" severity="severe" />);
    expect(screen.getByText('severe')).toHaveClass('badge-error');
  });

  it('renders duration, note and date', () => {
    render(
      <SymptomCard
        name="Headache"
        severity="mild"
        duration="2 days"
        note="Worse in the morning"
        date="Aug 8"
      />
    );
    expect(screen.getByText('Duration: 2 days')).toBeInTheDocument();
    expect(screen.getByText('Worse in the morning')).toBeInTheDocument();
    expect(screen.getByText('Aug 8')).toBeInTheDocument();
  });
});
