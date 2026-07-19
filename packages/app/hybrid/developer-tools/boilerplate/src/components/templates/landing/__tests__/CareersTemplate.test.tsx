import { fireEvent, render, screen } from '@testing-library/react';
import { CareersTemplate } from '../CareersTemplate';

describe('CareersTemplate', () => {
  it('renders the heading, departments, and job listings', () => {
    render(<CareersTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Work with us' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/open positions across the team/)
    ).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Product & Design')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Product Designer')).toBeInTheDocument();
  });

  it('marks a job as applied after clicking Apply', () => {
    render(<CareersTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Apply' })[0]);
    expect(screen.getAllByText('Application sent').length).toBeGreaterThan(0);
  });
});
