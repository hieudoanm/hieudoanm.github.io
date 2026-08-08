import { fireEvent, render, screen } from '@testing-library/react';
import { MediaLibraryTemplate } from '../MediaLibraryTemplate';

describe('MediaLibraryTemplate', () => {
  it('renders assets with type, size and the summary', () => {
    render(<MediaLibraryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Media Library' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 assets')).toBeInTheDocument();
    expect(screen.getByText('hero-banner.png')).toBeInTheDocument();
    expect(screen.getByText('2.4 MB')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Delete selected (0)' })
    ).toBeDisabled();
  });

  it('filters assets by type and search', () => {
    render(<MediaLibraryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Video' }));
    expect(screen.getByText('2 assets')).toBeInTheDocument();
    expect(screen.getByText('product-demo.mp4')).toBeInTheDocument();
    expect(screen.queryByText('hero-banner.png')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search assets'), {
      target: { value: 'podcast' },
    });
    expect(screen.getByText('0 assets')).toBeInTheDocument();
    expect(screen.getByText('No assets found')).toBeInTheDocument();
  });

  it('selects and deletes assets', () => {
    render(<MediaLibraryTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Select hero-banner.png' })
    );
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Select team-photo.jpg' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete selected (2)' })
    );
    expect(screen.getByText('6 assets')).toBeInTheDocument();
    expect(screen.queryByText('hero-banner.png')).not.toBeInTheDocument();
    expect(screen.queryByText('team-photo.jpg')).not.toBeInTheDocument();
  });
});
