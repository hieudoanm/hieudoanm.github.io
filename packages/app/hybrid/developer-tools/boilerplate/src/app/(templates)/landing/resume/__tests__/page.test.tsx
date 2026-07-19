import { render, screen } from '@testing-library/react';
import ResumePage from '@/app/(templates)/landing/resume/page';

describe('ResumePage', () => {
  it('renders resume profile and sections', () => {
    render(<ResumePage />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Openmetrics')).toBeInTheDocument();
    expect(screen.getByText('B.Sc. in Computer Science')).toBeInTheDocument();
  });
});
