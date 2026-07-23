import { render, screen } from '@testing-library/react';
import { ExtraSection } from '../ExtraSection';

describe('ExtraSection', () => {
  it('renders section heading', () => {
    render(<ExtraSection />);
    expect(screen.getByText('Extra')).toBeInTheDocument();
    expect(screen.getByText('More building blocks')).toBeInTheDocument();
  });

  it('renders chat bubbles', () => {
    render(<ExtraSection />);
    expect(screen.getByText("It's over Anakin.")).toBeInTheDocument();
    expect(screen.getByText('I have the high ground.')).toBeInTheDocument();
    expect(screen.getByText('You underestimate my power!')).toBeInTheDocument();
  });

  it('renders chat headers', () => {
    render(<ExtraSection />);
    const obiWans = screen.getAllByText('Obi-Wan Kenobi');
    expect(obiWans.length).toBe(2);
    expect(screen.getByText('Anakin')).toBeInTheDocument();
  });

  it('renders dividers', () => {
    render(<ExtraSection />);
    expect(screen.getByText('OR')).toBeInTheDocument();
    expect(screen.getByText('Neutral')).toBeInTheDocument();
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders carousel', () => {
    render(<ExtraSection />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('renders indicators', () => {
    render(<ExtraSection />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Alerts')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<ExtraSection />);
    expect(container).toMatchSnapshot();
  });
});
