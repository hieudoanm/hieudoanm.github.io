import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScreenshotCarousel } from '../ScreenshotCarousel';

const SHOTS = ['/img1.png', '/img2.png', '/img3.png'];

describe('ScreenshotCarousel', () => {
  it('returns null for empty screenshots', () => {
    const { container } = render(
      <ScreenshotCarousel screenshots={[]} label="App" />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders a single screenshot without navigation', () => {
    render(<ScreenshotCarousel screenshots={['/img1.png']} label="App" />);
    expect(screen.getByAltText('App screenshot 1')).toBeTruthy();
    expect(screen.queryByLabelText('Previous screenshot')).toBeNull();
    expect(screen.queryByLabelText('Next screenshot')).toBeNull();
  });

  it('renders thumbnails and navigation for multiple screenshots', () => {
    render(<ScreenshotCarousel screenshots={SHOTS} label="App" />);
    expect(screen.getByAltText('App screenshot 1')).toBeTruthy();
    expect(screen.getByAltText('App thumbnail 1')).toBeTruthy();
    expect(screen.getByAltText('App thumbnail 3')).toBeTruthy();
    expect(screen.getByLabelText('Next screenshot')).toBeTruthy();
  });

  it('navigates to next screenshot', async () => {
    const user = userEvent.setup();
    render(<ScreenshotCarousel screenshots={SHOTS} label="App" />);
    await user.click(screen.getByLabelText('Next screenshot'));
    expect(screen.getByAltText('App screenshot 2')).toBeTruthy();
  });

  it('navigates to previous screenshot with wrap-around', async () => {
    const user = userEvent.setup();
    render(<ScreenshotCarousel screenshots={SHOTS} label="App" />);
    await user.click(screen.getByLabelText('Previous screenshot'));
    expect(screen.getByAltText('App screenshot 3')).toBeTruthy();
  });

  it('jumps to a screenshot via thumbnail', async () => {
    const user = userEvent.setup();
    render(<ScreenshotCarousel screenshots={SHOTS} label="App" />);
    await user.click(screen.getByLabelText('View screenshot 3'));
    expect(screen.getByAltText('App screenshot 3')).toBeTruthy();
  });

  it('opens lightbox when main image is clicked', async () => {
    const user = userEvent.setup();
    render(<ScreenshotCarousel screenshots={SHOTS} label="App" />);
    await user.click(
      screen.getByLabelText('View App screenshot 1 full screen')
    );
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText('1 / 3')).toBeTruthy();
  });

  it('navigates inside lightbox', async () => {
    const user = userEvent.setup();
    render(<ScreenshotCarousel screenshots={SHOTS} label="App" />);
    await user.click(
      screen.getByLabelText('View App screenshot 1 full screen')
    );
    const lightboxNext = screen.getAllByLabelText('Next screenshot')[1];
    await user.click(lightboxNext);
    expect(screen.getByText('2 / 3')).toBeTruthy();
    expect(screen.getByAltText('App screenshot 2 full screen')).toBeTruthy();
  });

  it('closes lightbox on escape', async () => {
    const user = userEvent.setup();
    render(<ScreenshotCarousel screenshots={SHOTS} label="App" />);
    await user.click(
      screen.getByLabelText('View App screenshot 1 full screen')
    );
    expect(screen.getByRole('dialog')).toBeTruthy();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes lightbox when backdrop is clicked', () => {
    render(<ScreenshotCarousel screenshots={SHOTS} label="App" />);
    fireEvent.click(screen.getByLabelText('View App screenshot 1 full screen'));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeTruthy();
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes lightbox via close button', async () => {
    const user = userEvent.setup();
    render(<ScreenshotCarousel screenshots={SHOTS} label="App" />);
    await user.click(
      screen.getByLabelText('View App screenshot 1 full screen')
    );
    await user.click(screen.getByLabelText('Close full screen view'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
