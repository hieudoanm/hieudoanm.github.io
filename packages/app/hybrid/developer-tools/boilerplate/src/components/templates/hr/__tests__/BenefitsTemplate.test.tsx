import { fireEvent, render, screen } from '@testing-library/react';
import { BenefitsTemplate } from '../BenefitsTemplate';

describe('BenefitsTemplate', () => {
  it('renders benefits and the summary', () => {
    render(<BenefitsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Benefits' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 benefits enrolled')).toBeInTheDocument();
    expect(screen.getByText('Health insurance')).toBeInTheDocument();
    expect(screen.getByText('Dental')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Leave' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Enroll' })).toHaveLength(3);
  });

  it('enrolls in a benefit', () => {
    render(<BenefitsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Enroll' })[0]);
    expect(screen.getByText('4 benefits enrolled')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Leave' })).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Enroll' })).toHaveLength(2);
  });

  it('leaves a benefit', () => {
    render(<BenefitsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Leave' })[0]);
    expect(screen.getByText('2 benefits enrolled')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Enroll' })).toHaveLength(4);
  });
});
