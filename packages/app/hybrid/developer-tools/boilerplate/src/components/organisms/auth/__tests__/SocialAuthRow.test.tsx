import { fireEvent, render, screen } from '@testing-library/react';
import { SocialAuthRow } from '../SocialAuthRow';

const providers = [
  { id: 'google', label: 'Google' },
  { id: 'github', label: 'GitHub' },
];

describe('SocialAuthRow', () => {
  it('renders the provider buttons', () => {
    render(<SocialAuthRow providers={providers} />);
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders the divider text', () => {
    render(<SocialAuthRow providers={providers} dividerText="or use SSO" />);
    expect(screen.getByText('or use SSO')).toBeInTheDocument();
  });

  it('fires onProvider with the provider id', () => {
    const onProvider = jest.fn();
    render(<SocialAuthRow providers={providers} onProvider={onProvider} />);
    fireEvent.click(screen.getByTestId('provider-google'));
    expect(onProvider).toHaveBeenCalledWith('google');
  });
});
