import { render, screen } from '@testing-library/react';
import { Label } from '../../auth/Label';
import { Text } from '../Text';

describe('Text', () => {
  it('renders a paragraph by default', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello').tagName).toBe('P');
  });

  it('renders with the requested tag and classes', () => {
    render(
      <Text as="span" size="sm" weight="semibold" color="muted">
        Label
      </Text>
    );
    const el = screen.getByText('Label');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass('text-sm', 'font-semibold', 'text-base-content/60');
  });

  it('applies primary color class', () => {
    render(<Text color="primary">Hi</Text>);
    expect(screen.getByText('Hi')).toHaveClass('text-primary');
  });
});
