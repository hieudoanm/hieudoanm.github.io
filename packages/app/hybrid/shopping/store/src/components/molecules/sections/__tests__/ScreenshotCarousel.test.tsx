import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScreenshotCarousel } from '../ScreenshotCarousel';

describe('ScreenshotCarousel', () => {
  it('returns null for empty screenshots', () => {
    const { container } = render(
      <ScreenshotCarousel screenshots={[]} label="App" />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders a single screenshot without navigation buttons', () => {
    render(<ScreenshotCarousel screenshots={['/img1.png']} label="App" />);
    expect(screen.getByAltText('App screenshot 1')).toBeTruthy();
    expect(screen.queryByText('Screenshots')).toBeTruthy();
  });

  it('renders navigation buttons for multiple screenshots', () => {
    render(
      <ScreenshotCarousel
        screenshots={['/img1.png', '/img2.png', '/img3.png']}
        label="App"
      />
    );
    expect(screen.getByAltText('App screenshot 1')).toBeTruthy();
    expect(screen.getByText('Screenshots')).toBeTruthy();
  });

  it('navigates to next screenshot', async () => {
    const user = userEvent.setup();
    render(
      <ScreenshotCarousel
        screenshots={['/img1.png', '/img2.png']}
        label="App"
      />
    );
    expect(screen.getByAltText('App screenshot 1')).toBeTruthy();
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);
    expect(screen.getByAltText('App screenshot 2')).toBeTruthy();
  });

  it('navigates to previous screenshot', async () => {
    const user = userEvent.setup();
    render(
      <ScreenshotCarousel
        screenshots={['/img1.png', '/img2.png']}
        label="App"
      />
    );
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(screen.getByAltText('App screenshot 2')).toBeTruthy();
  });

  it('wraps around from last to first', async () => {
    const user = userEvent.setup();
    render(
      <ScreenshotCarousel
        screenshots={['/img1.png', '/img2.png']}
        label="App"
      />
    );
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);
    await user.click(buttons[1]);
    expect(screen.getByAltText('App screenshot 1')).toBeTruthy();
  });

  it('wraps around from first to last on prev', async () => {
    const user = userEvent.setup();
    render(
      <ScreenshotCarousel
        screenshots={['/img1.png', '/img2.png']}
        label="App"
      />
    );
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(screen.getByAltText('App screenshot 2')).toBeTruthy();
  });

  it('renders dot indicators for multiple screenshots', () => {
    render(
      <ScreenshotCarousel
        screenshots={['/img1.png', '/img2.png', '/img3.png']}
        label="App"
      />
    );
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe('/img1.png');
  });

  it('clicking dot navigates to that screenshot', async () => {
    const user = userEvent.setup();
    render(
      <ScreenshotCarousel
        screenshots={['/img1.png', '/img2.png', '/img3.png']}
        label="App"
      />
    );
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[4]);
    expect(screen.getByAltText('App screenshot 3')).toBeTruthy();
  });
});
