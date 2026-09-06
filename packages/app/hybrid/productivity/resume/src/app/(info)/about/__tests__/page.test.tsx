import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders the app name', () => {
    render(<AboutPage />);
    expect(screen.getByText('Open Resume')).toBeInTheDocument();
  });

  it('renders the template count', () => {
    render(<AboutPage />);
    expect(screen.getByText('32 Free Templates')).toBeInTheDocument();
  });

  it('renders the supported paper sizes', () => {
    render(<AboutPage />);
    expect(screen.getByText('A3 · A4 · A5 · A6 · B5')).toBeInTheDocument();
  });
});
