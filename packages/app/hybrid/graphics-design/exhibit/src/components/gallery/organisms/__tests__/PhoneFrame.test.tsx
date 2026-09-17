import { render, screen } from '@testing-library/react';
import { PhoneFrame } from '@/components/gallery/organisms/PhoneFrame';

jest.mock('next/navigation', () => ({
  usePathname: () => '/gallery',
}));

describe('PhoneFrame', () => {
  it('renders the frame, title and children', () => {
    render(
      <PhoneFrame title="Photos">
        <p>content</p>
      </PhoneFrame>
    );
    expect(screen.getByTestId('phone-frame')).toBeInTheDocument();
    expect(screen.getByTestId('phone-notch')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Photos' })).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('renders a back link when provided', () => {
    render(
      <PhoneFrame title="Album" backHref="/gallery/albums">
        <p>content</p>
      </PhoneFrame>
    );
    expect(screen.getByLabelText('Back')).toHaveAttribute(
      'href',
      '/gallery/albums'
    );
  });

  it('omits the back link by default', () => {
    render(
      <PhoneFrame title="Photos">
        <p>content</p>
      </PhoneFrame>
    );
    expect(screen.queryByLabelText('Back')).not.toBeInTheDocument();
  });

  it('renders header actions', () => {
    render(
      <PhoneFrame title="Photos" actions={<button>Go</button>}>
        <p>content</p>
      </PhoneFrame>
    );
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
});
