import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';
import { buildVersion } from '@/content/version';

describe('AboutPage', () => {
  it('renders app info and tech stack items', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'PDF' })).toBeInTheDocument();
    expect(screen.getByText('PDF viewer and editor')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 6')).toBeInTheDocument();
    expect(screen.getByText('Styling')).toBeInTheDocument();
    expect(screen.getByText('Format')).toBeInTheDocument();
    expect(screen.getByText(buildVersion)).toBeInTheDocument();
  });
});
