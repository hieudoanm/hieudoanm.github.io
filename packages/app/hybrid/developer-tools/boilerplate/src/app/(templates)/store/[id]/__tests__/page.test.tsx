import { render, screen } from '@testing-library/react';
import StoreItem, {
  generateStaticParams,
} from '@/app/(templates)/store/[id]/page';

describe('StoreItem', () => {
  it('renders a product detail page', async () => {
    const element = await StoreItem({ params: Promise.resolve({ id: '2' }) });
    render(element);
    expect(screen.getAllByText('Mechanical Keyboard').length).toBeGreaterThan(
      0
    );
  });

  it('generates static params for all product ids', () => {
    expect(generateStaticParams()).toHaveLength(12);
  });
});
