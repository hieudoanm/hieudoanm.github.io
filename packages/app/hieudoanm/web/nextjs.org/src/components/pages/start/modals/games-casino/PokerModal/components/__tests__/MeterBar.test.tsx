import { render } from '@testing-library/react';
import { MeterBar } from '../MeterBar';

describe('MeterBar', () => {
  const getInner = (container: HTMLElement) =>
    container.firstChild!.firstChild as HTMLElement;

  it('renders with correct width', () => {
    const { container } = render(<MeterBar pct={75} />);
    expect(getInner(container)).toHaveStyle({ width: '75%' });
  });

  it('caps width at 100', () => {
    const { container } = render(<MeterBar pct={150} />);
    expect(getInner(container)).toHaveStyle({ width: '100%' });
  });

  it('renders with green color when pct > 50', () => {
    const { container } = render(<MeterBar pct={75} />);
    expect(getInner(container)).toHaveStyle({ backgroundColor: '#22c55e' });
  });

  it('renders with yellow color when pct > 25', () => {
    const { container } = render(<MeterBar pct={30} />);
    expect(getInner(container)).toHaveStyle({ backgroundColor: '#f59e0b' });
  });

  it('renders with red color when pct <= 25', () => {
    const { container } = render(<MeterBar pct={10} />);
    expect(getInner(container)).toHaveStyle({ backgroundColor: '#ef4444' });
  });
});
