import { fireEvent, render, screen } from '@testing-library/react';
import { PackageManager } from '../PackageManager';

const packages = [
  { id: '1', name: 'react', version: '19.0.0', description: 'UI library' },
  { id: '2', name: 'eslint', version: '9.0.0', devDependency: true },
];

describe('PackageManager', () => {
  it('renders packages with versions and dev badges', () => {
    render(<PackageManager packages={packages} />);
    expect(screen.getByText('Package manager')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('19.0.0')).toBeInTheDocument();
    expect(screen.getByText('dev')).toBeInTheDocument();
  });

  it('filters packages by search query', () => {
    render(<PackageManager packages={packages} />);
    fireEvent.change(screen.getByTestId('package-search'), {
      target: { value: 'eslint' },
    });
    expect(screen.getByText('eslint')).toBeInTheDocument();
    expect(screen.queryByText('react')).not.toBeInTheDocument();
  });

  it('shows empty state when no packages match', () => {
    render(<PackageManager packages={packages} />);
    fireEvent.change(screen.getByTestId('package-search'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No packages found.')).toBeInTheDocument();
  });
});
