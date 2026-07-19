import { render, screen } from '@testing-library/react';
import { FolderIcon } from '../FolderIcon';

describe('FolderIcon', () => {
  it('renders an inline svg icon', () => {
    render(<FolderIcon />);
    expect(screen.getByTestId('folder-icon')).toBeInTheDocument();
  });

  it('applies the custom className', () => {
    render(<FolderIcon className="text-base-content/60" />);
    expect(screen.getByTestId('folder-icon')).toHaveClass(
      'text-base-content/60'
    );
  });

  it('respects the size prop', () => {
    render(<FolderIcon size={18} />);
    const icon = screen.getByTestId('folder-icon');
    expect(icon).toHaveAttribute('width', '18');
    expect(icon).toHaveAttribute('height', '18');
  });
});
