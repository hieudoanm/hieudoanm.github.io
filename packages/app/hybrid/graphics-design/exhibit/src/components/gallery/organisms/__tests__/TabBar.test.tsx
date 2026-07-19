import { render, screen } from '@testing-library/react';
import { TabBar } from '@/components/gallery/organisms/TabBar';

const mockPathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

const renderAt = (pathname: string) => {
  mockPathname.mockReturnValue(pathname);
  render(<TabBar />);
};

const isActive = (label: string): boolean =>
  screen.getByLabelText(label).className.includes('text-primary');

describe('TabBar', () => {
  it('marks photos active on the gallery root', () => {
    renderAt('/gallery');
    expect(isActive('Photos')).toBe(true);
    expect(isActive('Albums')).toBe(false);
    expect(isActive('Search')).toBe(false);
  });

  it('marks photos active on the photo viewer', () => {
    renderAt('/gallery/photo');
    expect(isActive('Photos')).toBe(true);
  });

  it('marks albums active on the album list', () => {
    renderAt('/gallery/albums');
    expect(isActive('Albums')).toBe(true);
    expect(isActive('Photos')).toBe(false);
  });

  it('marks albums active on the album detail', () => {
    renderAt('/gallery/album?id=a-1');
    expect(isActive('Albums')).toBe(true);
  });

  it('marks search active on the search screen', () => {
    renderAt('/gallery/search');
    expect(isActive('Search')).toBe(true);
    expect(isActive('Photos')).toBe(false);
  });
});
