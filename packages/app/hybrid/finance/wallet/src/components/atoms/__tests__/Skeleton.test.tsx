import { render, screen } from '@testing-library/react';
import Skeleton, {
  SkeletonText,
  SkeletonCircle,
  SkeletonCard,
} from '../Skeleton';

describe('Skeleton', () => {
  it('renders with default className', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(<Skeleton className="h-20 w-20" />);
    expect(container.firstChild).toHaveClass('h-20', 'w-20');
  });
});

describe('SkeletonText', () => {
  it('renders with default className', () => {
    const { container } = render(<SkeletonText />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(<SkeletonText className="w-1/2" />);
    expect(container.firstChild).toHaveClass('w-1/2');
  });
});

describe('SkeletonCircle', () => {
  it('renders with default className', () => {
    const { container } = render(<SkeletonCircle />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(<SkeletonCircle className="h-20 w-20" />);
    expect(container.firstChild).toHaveClass('h-20', 'w-20');
  });
});

describe('SkeletonCard', () => {
  it('renders with default className', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(<SkeletonCard className="h-36" />);
    expect(container.firstChild).toHaveClass('h-36');
  });
});
