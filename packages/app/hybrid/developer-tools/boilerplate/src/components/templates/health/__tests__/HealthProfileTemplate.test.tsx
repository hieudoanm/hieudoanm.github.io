import { fireEvent, render, screen } from '@testing-library/react';
import { HealthProfileTemplate } from '../HealthProfileTemplate';

describe('HealthProfileTemplate', () => {
  it('renders the profile card and the health metrics', () => {
    render(<HealthProfileTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Health Profile' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 health metrics')).toBeInTheDocument();
    expect(screen.getByText('Alex Nguyen')).toBeInTheDocument();
    expect(screen.getByText('29 years')).toBeInTheDocument();
    expect(screen.getByText('178 cm')).toBeInTheDocument();
    expect(screen.getByText('72 kg')).toBeInTheDocument();
    expect(screen.getByText('O+')).toBeInTheDocument();
    expect(screen.getByText('22.7')).toBeInTheDocument();
    expect(screen.getByText('58 bpm')).toBeInTheDocument();
    expect(screen.getByText('46 ml/kg/min')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Edit profile' })
    ).toBeInTheDocument();
  });

  it('starts saving the profile', () => {
    render(<HealthProfileTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit profile' }));
    expect(screen.getByText('Saving...')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Edit profile' })
    ).not.toBeInTheDocument();
  });
});
