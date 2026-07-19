import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LinkPreviewCard } from '@/components/molecules/LinkPreviewCard';
import type { LinkPreview } from '@/types';

jest.mock('react-icons/fa', () => ({
  FaExternalLinkAlt: () => <span data-testid="icon-external" />,
}));

const basePreview: LinkPreview = {
  url: 'https://example.com/article',
  title: 'Example Article',
  description: 'A great article about testing.',
  siteName: 'Example',
};

describe('LinkPreviewCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and description', () => {
    render(<LinkPreviewCard preview={basePreview} />);
    expect(screen.getByText('Example Article')).toBeInTheDocument();
    expect(
      screen.getByText('A great article about testing.')
    ).toBeInTheDocument();
  });

  it('renders siteName', () => {
    render(<LinkPreviewCard preview={basePreview} />);
    expect(screen.getByText('Example')).toBeInTheDocument();
  });

  it('renders hostname from the URL', () => {
    render(<LinkPreviewCard preview={basePreview} />);
    expect(screen.getByText('example.com')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    const preview = { ...basePreview, image: 'https://example.com/image.jpg' };
    render(<LinkPreviewCard preview={preview} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'Example Article');
  });

  it('does not render image when not provided', () => {
    render(<LinkPreviewCard preview={basePreview} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders link with correct href and target', () => {
    render(<LinkPreviewCard preview={basePreview} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com/article');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
