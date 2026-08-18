import { fireEvent, render, screen, within } from '@testing-library/react';
import { CourseCatalogTemplate } from '../CourseCatalogTemplate';

describe('CourseCatalogTemplate', () => {
  it('renders the catalog with a count summary and course details', () => {
    render(<CourseCatalogTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Course Catalog' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Browse all available courses.')
    ).toBeInTheDocument();
    expect(screen.getByText('6 courses')).toBeInTheDocument();
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(screen.getAllByText('Development')).toHaveLength(3);
    expect(screen.getByText('6h 30m')).toBeInTheDocument();
    expect(screen.getAllByText(/lessons/)).toHaveLength(6);
  });

  it('filters courses by category tab', () => {
    render(<CourseCatalogTemplate />);
    const main = screen.getByRole('main');
    fireEvent.click(within(main).getByRole('button', { name: 'Design' }));
    expect(screen.getByText('2 courses')).toBeInTheDocument();
    expect(screen.getByText('UI Design Essentials')).toBeInTheDocument();
    expect(screen.queryByText('React Masterclass')).not.toBeInTheDocument();
    fireEvent.click(within(main).getByRole('button', { name: 'All' }));
    expect(screen.getByText('6 courses')).toBeInTheDocument();
  });

  it('searches courses and shows the empty state', () => {
    render(<CourseCatalogTemplate />);
    const input = screen.getByRole('textbox', { name: 'Search courses' });
    fireEvent.change(input, { target: { value: 'figma' } });
    expect(screen.getByText('1 courses')).toBeInTheDocument();
    expect(screen.getByText('Figma Advanced')).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.getByText('No courses found')).toBeInTheDocument();
    expect(screen.getByText('0 courses')).toBeInTheDocument();
  });
});
