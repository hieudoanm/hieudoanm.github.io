import { fireEvent, render, screen } from '@testing-library/react';
import { CookieConsentTemplate } from '../CookieConsentTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('CookieConsentTemplate', () => {
  it('renders consent banner', () => {
    render(<CookieConsentTemplate />);
    expect(screen.getByText('This site uses cookies')).toBeInTheDocument();
  });

  it('dismisses on accept', () => {
    render(<CookieConsentTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    expect(
      screen.queryByText('This site uses cookies')
    ).not.toBeInTheDocument();
  });

  it('dismisses on close button', () => {
    const { container } = render(<CookieConsentTemplate />);
    const closeButton = container.querySelector('button.btn-ghost')!;
    fireEvent.click(closeButton);
    expect(
      screen.queryByText('This site uses cookies')
    ).not.toBeInTheDocument();
  });

  it('links to privacy policy', () => {
    render(<CookieConsentTemplate />);
    expect(
      screen.getByRole('link', { name: 'Privacy Policy' })
    ).toHaveAttribute('href', '/landing/privacy');
  });
});
