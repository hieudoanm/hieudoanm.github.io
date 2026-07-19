import { render, screen } from '@testing-library/react';
import { FilterChip } from '../FilterChip';

describe('FilterChip', () => {
  it('renders label', () => {
    render(<FilterChip label="Test" active={false} onClick={() => {}} />);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('applies active class when active', () => {
    render(<FilterChip label="Test" active={true} onClick={() => {}} />);
    const btn = screen.getByText('Test');
    expect(btn.className).toContain('badge-primary');
  });

  it('applies inactive class when not active', () => {
    render(<FilterChip label="Test" active={false} onClick={() => {}} />);
    const btn = screen.getByText('Test');
    expect(btn.className).toContain('bg-base-300');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<FilterChip label="Test" active={false} onClick={onClick} />);
    screen.getByText('Test').click();
    expect(onClick).toHaveBeenCalled();
  });
});
