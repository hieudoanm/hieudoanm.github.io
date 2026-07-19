import { render } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon', () => {
  it.each(['bell', 'home', 'user', 'search', 'star'] as const)(
    'renders %s icon as svg',
    (name) => {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    }
  );

  it('applies size classes', () => {
    const { container, rerender } = render(<Icon name="home" size="sm" />);
    expect(container.querySelector('svg')).toHaveClass('h-4');
    rerender(<Icon name="home" size="lg" />);
    expect(container.querySelector('svg')).toHaveClass('h-6');
  });
});
