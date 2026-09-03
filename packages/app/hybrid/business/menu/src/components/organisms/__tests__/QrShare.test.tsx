import { render, screen } from '@testing-library/react';
import { QrShare } from '../QrShare';
import type { MenuStore } from '../types';
import { emptyMenu, createRestaurant } from '@/lib/menu';

jest.mock('@/lib/qr', () => ({
  qrDataUrl: jest.fn(() => Promise.resolve('data:image/png;base64,FAKE')),
}));

const renderQr = (restaurantName = 'Cafe') => {
  const { state: s1, restaurant } = createRestaurant(emptyMenu(), {
    name: restaurantName,
    accent: 'primary',
    tableCount: 1,
  });
  let currentState = s1;
  const setState = jest.fn((updater: any) => {
    currentState =
      typeof updater === 'function' ? updater(currentState) : updater;
  });
  const store: MenuStore = {
    get state() {
      return currentState;
    },
    setState,
    reset: jest.fn(),
  };
  return render(<QrShare restaurant={restaurant} store={store} />);
};

describe('QrShare', () => {
  it('shows loading state initially', () => {
    renderQr();
    expect(screen.getByText('Generating…')).toBeInTheDocument();
  });

  it('renders the QR image after loading', async () => {
    renderQr();
    const img = await screen.findByRole('img', { name: /qr code/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'data:image/png;base64,FAKE');
  });

  it('shows the share description', async () => {
    renderQr();
    await screen.findByRole('img', { name: /qr code/i });
    expect(
      screen.getByText(/print this qr code or send the link/i)
    ).toBeInTheDocument();
  });

  it('shows the copy button and open menu link', async () => {
    renderQr();
    await screen.findByRole('img', { name: /qr code/i });
    expect(
      screen.getByRole('button', { name: /copy link/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /open menu/i })
    ).toBeInTheDocument();
  });
});
