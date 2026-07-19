import { render, screen } from '@testing-library/react';
import { VideoSection } from '../VideoSection';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('VideoSection', () => {
  it('renders a title', () => {
    render(<VideoSection title="Demo" videoId="abc" />);
    expect(screen.getByRole('heading', { name: 'Demo' })).toBeInTheDocument();
  });

  it('embeds a YouTube video from a videoId', () => {
    render(<VideoSection videoId="abc123" title="Demo" />);
    const frame = screen.getByTitle('Demo');
    expect(frame).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/abc123'
    );
  });

  it('renders a native video player from a source', () => {
    render(<VideoSection src="/clip.mp4" title="Clip" />);
    expect(screen.getByTitle('Clip')).toBeInTheDocument();
    expect(document.querySelector('video source')).toHaveAttribute(
      'src',
      '/clip.mp4'
    );
  });

  it('falls back to a default title for an embedded video', () => {
    render(<VideoSection videoId="abc" />);
    expect(screen.getByTitle('Embedded video')).toBeInTheDocument();
  });

  it('passes a poster to the native player without a title', () => {
    render(<VideoSection src="/clip.mp4" poster="/poster.jpg" />);
    const video = screen.getByTitle('Embedded video');
    expect(video).toHaveAttribute('poster', '/poster.jpg');
  });

  it('shows a fallback message when no source is given', () => {
    render(<VideoSection />);
    expect(screen.getByText('No video source provided')).toBeInTheDocument();
  });
});
