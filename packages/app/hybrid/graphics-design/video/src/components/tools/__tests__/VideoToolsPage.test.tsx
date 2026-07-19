import { render, screen, fireEvent } from '@testing-library/react';
import { VideoToolsPage } from '@/components/tools/VideoToolsPage';
import { CATEGORIES } from '@/data/video-tools';

describe('VideoToolsPage', () => {
  it('renders the sidebar and an empty state by default', () => {
    render(<VideoToolsPage />);
    expect(
      screen.getByRole('heading', { name: 'Video Tools' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search tools...')).toBeInTheDocument();
    expect(
      screen.getByText('Select a video tool from the sidebar')
    ).toBeInTheDocument();
    for (const cat of CATEGORIES) {
      expect(
        screen.getByRole('button', { name: new RegExp(cat.label) })
      ).toBeInTheDocument();
    }
  });

  it('filters tools by the search query and forces categories open', () => {
    render(<VideoToolsPage />);
    const search = screen.getByPlaceholderText('Search tools...');
    fireEvent.change(search, { target: { value: 'aac to mp3' } });

    expect(
      screen.getByRole('button', { name: /AAC to MP3/ })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Compress/ })
    ).not.toBeInTheDocument();
  });

  it('expands and collapses categories', () => {
    render(<VideoToolsPage />);
    const convert = screen.getByRole('button', { name: /Convert/ });
    expect(
      screen.queryByRole('button', { name: /AAC to MP3/ })
    ).not.toBeInTheDocument();

    fireEvent.click(convert);
    expect(
      screen.getByRole('button', { name: /AAC to MP3/ })
    ).toBeInTheDocument();

    fireEvent.click(convert);
    expect(
      screen.queryByRole('button', { name: /AAC to MP3/ })
    ).not.toBeInTheDocument();
  });

  it('shows the generic tool component for convert tools', () => {
    render(<VideoToolsPage />);
    fireEvent.click(screen.getByRole('button', { name: /Convert/ }));
    fireEvent.click(screen.getByRole('button', { name: /AAC to MP3/ }));

    expect(
      screen.getAllByRole('heading', { name: 'AAC to MP3' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Convert' })).toBeDisabled();
  });

  it('shows a registered edit tool component', () => {
    render(<VideoToolsPage />);
    fireEvent.click(screen.getByRole('button', { name: /Edit/ }));
    fireEvent.click(screen.getByRole('button', { name: /Compress/ }));

    expect(
      screen.getByRole('heading', { name: 'Compress Video' })
    ).toBeInTheDocument();
  });

  it('shows the download tool component for download tools', () => {
    render(<VideoToolsPage />);
    fireEvent.click(screen.getByRole('button', { name: /Download/ }));
    fireEvent.click(screen.getByRole('button', { name: /Facebook/ }));

    expect(
      screen.getByRole('heading', { name: 'Facebook Download' })
    ).toBeInTheDocument();
  });
});
