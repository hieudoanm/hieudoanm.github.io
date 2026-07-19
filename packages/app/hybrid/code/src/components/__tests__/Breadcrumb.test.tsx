import { render, screen } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb', () => {
  it('renders segments from file path', () => {
    render(<Breadcrumb rootPath={null} filePath="/root/src/index.ts" />);
    expect(screen.getByText('root')).toBeInTheDocument();
    expect(screen.getByText('src')).toBeInTheDocument();
    expect(screen.getByText('index.ts')).toBeInTheDocument();
  });

  it('renders nothing for empty path', () => {
    const { container } = render(<Breadcrumb rootPath={null} filePath="" />);
    expect(container.innerHTML).toBe('');
  });

  it('highlights the last segment', () => {
    render(<Breadcrumb rootPath={null} filePath="/src/app.ts" />);
    const last = screen.getByText('app.ts');
    expect(last.className).toContain('text-base-content/80');
  });

  it('dims non-last segments', () => {
    render(<Breadcrumb rootPath={null} filePath="/a/b/c.ts" />);
    const first = screen.getByText('a');
    expect(first.className).toContain('text-base-content/40');
  });

  it('shows root folder name when rootPath is provided', () => {
    render(
      <Breadcrumb
        rootPath="/home/user/project"
        filePath="/home/user/project/src/index.ts"
      />
    );
    const projects = screen.getAllByText('project');
    expect(projects).toHaveLength(2);
  });
});
