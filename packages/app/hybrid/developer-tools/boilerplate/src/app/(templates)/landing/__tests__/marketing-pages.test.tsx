import { render, screen } from '@testing-library/react';
import LandingPage from '../landing/page';
import PrivacyPage from '../privacy/page';
import TermsPage from '../terms/page';
import ResumePage from '../resume/page';

describe('LandingPage', () => {
  it('renders hero and features', () => {
    render(<LandingPage />);
    expect(
      screen.getAllByText('Modern Next.js Starter').length
    ).toBeGreaterThan(0);
    expect(screen.getByText('Beautiful UI')).toBeInTheDocument();
    expect(screen.getByText('Blazing fast')).toBeInTheDocument();
    expect(screen.getByText('Type safe')).toBeInTheDocument();
  });
});

describe('PrivacyPage', () => {
  it('renders privacy policy sections', () => {
    render(<PrivacyPage />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
  });
});

describe('TermsPage', () => {
  it('renders terms sections', () => {
    render(<TermsPage />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
  });
});

describe('ResumePage', () => {
  it('renders resume profile and sections', () => {
    render(<ResumePage />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Openmetrics')).toBeInTheDocument();
    expect(screen.getByText('B.Sc. in Computer Science')).toBeInTheDocument();
  });
});
