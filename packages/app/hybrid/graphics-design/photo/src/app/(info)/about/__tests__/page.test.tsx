import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

describe('AboutPage', () => {
  it('renders the about page', () => {
    render(<AboutPage />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
