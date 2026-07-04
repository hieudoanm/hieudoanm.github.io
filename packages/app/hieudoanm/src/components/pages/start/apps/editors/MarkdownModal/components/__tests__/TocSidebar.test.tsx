import { render, screen, fireEvent } from '@testing-library/react';
import { TocSidebar } from '../TocSidebar';

describe('TocSidebar', () => {
  const items = [
    { level: 1, text: 'Introduction', line: 1 },
    { level: 2, text: 'Getting Started', line: 5 },
    { level: 3, text: 'Installation', line: 10 },
  ];

  it('renders all toc items', () => {
    render(<TocSidebar items={items} onScrollTo={jest.fn()} />);
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Installation')).toBeInTheDocument();
  });

  it('calls onScrollTo with correct line number when clicked', () => {
    const onScrollTo = jest.fn();
    render(<TocSidebar items={items} onScrollTo={onScrollTo} />);

    fireEvent.click(screen.getByText('Introduction'));
    expect(onScrollTo).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Installation'));
    expect(onScrollTo).toHaveBeenCalledWith(10);
  });

  it('shows "No headings" when items is empty', () => {
    render(<TocSidebar items={[]} onScrollTo={jest.fn()} />);
    expect(screen.getByText('No headings')).toBeInTheDocument();
  });
});
