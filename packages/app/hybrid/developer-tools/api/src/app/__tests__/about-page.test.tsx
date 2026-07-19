import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

describe('AboutPage', () => {
  it('renders about info', () => {
    render(<AboutPage />);
    expect(screen.getByText('API Client')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
  });
});
