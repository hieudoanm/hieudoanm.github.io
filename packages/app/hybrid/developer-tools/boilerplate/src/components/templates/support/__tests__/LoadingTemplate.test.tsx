import { render } from '@testing-library/react';
import { LoadingTemplate } from '../LoadingTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('LoadingTemplate', () => {
  it.each(['app', 'auth', 'blog', 'store'] as const)(
    'renders %s skeleton placeholders',
    (variant) => {
      const { container } = render(<LoadingTemplate variant={variant} />);
      expect(
        container.querySelectorAll('.animate-pulse').length
      ).toBeGreaterThan(0);
    }
  );
});
