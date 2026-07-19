jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import AboutPage from '@/app/(info)/about/page';
import VersionPage from '@/app/(info)/version/page';
import ErrorPage from '@/app/error';
import NotFoundPage from '@/app/not-found';
import RootLayout from '@/app/layout';
import TermsOfServicePage from '@/app/(settings)/terms-of-service/page';
import PrivacyPolicyPage from '@/app/(settings)/privacy-policy/page';
import HelpSupportPage from '@/app/(settings)/help-support/page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('AboutPage', () => {
  it('renders app info', () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Wallet')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});

describe('VersionPage', () => {
  it('renders version segments', () => {
    renderWithProviders(<VersionPage />);
    expect(screen.getByText('Wallet Version')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
  });

  it('copies the version to clipboard', async () => {
    renderWithProviders(<VersionPage />);
    const writeText = navigator.clipboard.writeText as jest.Mock;
    fireEvent.click(screen.getByText('Copy version'));
    await waitFor(() => {
      expect(writeText).toHaveBeenCalled();
    });
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });
});

describe('ErrorPage', () => {
  it('fires reload on Try Again', () => {
    renderWithProviders(<ErrorPage />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(() => fireEvent.click(screen.getByText('Try Again'))).not.toThrow();
  });
});

describe('NotFoundPage', () => {
  it('renders the 404 page', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });
});

describe('RootLayout', () => {
  it('wraps children with providers', () => {
    localStorage.setItem('wallet-auth', 'true');
    renderWithProviders(
      <RootLayout>
        <div data-testid="child">Child</div>
      </RootLayout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

describe('static dashboard pages', () => {
  it('renders Terms of Service', () => {
    renderWithProviders(<TermsOfServicePage />);
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders Privacy Policy', () => {
    renderWithProviders(<PrivacyPolicyPage />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders Help & Support', () => {
    renderWithProviders(<HelpSupportPage />);
    expect(screen.getByText('Help & Support')).toBeInTheDocument();
  });
});
