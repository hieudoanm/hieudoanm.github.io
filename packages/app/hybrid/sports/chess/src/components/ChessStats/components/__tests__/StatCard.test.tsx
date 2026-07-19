import { render, screen } from '@testing-library/react';
import { StatCard } from '../StatCard';

describe('StatCard', () => {
  it('renders label and formatted value', () => {
    render(<StatCard label="GM" value={1500} />);
    expect(screen.getByText('GM')).toBeTruthy();
    expect(screen.getByText('1,500')).toBeTruthy();
  });

  it('renders zero value', () => {
    render(<StatCard label="TEST" value={0} />);
    expect(screen.getByText('0')).toBeTruthy();
  });
});
