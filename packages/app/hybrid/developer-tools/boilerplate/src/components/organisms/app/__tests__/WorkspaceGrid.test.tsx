import { fireEvent, render, screen } from '@testing-library/react';
import { WorkspaceGrid } from '../WorkspaceGrid';

const workspaces = [
  { id: 'w1', name: 'Design', description: 'Brand assets', members: 4 },
  { id: 'w2', name: 'Engineering', members: 12, color: 'secondary' as const },
];

describe('WorkspaceGrid', () => {
  it('renders workspace cards with member counts', () => {
    render(<WorkspaceGrid workspaces={workspaces} />);
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Brand assets')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('4 members')).toBeInTheDocument();
    expect(screen.getByText('12 members')).toBeInTheDocument();
  });

  it('shows an empty state with a create button', () => {
    const onCreate = jest.fn();
    render(<WorkspaceGrid workspaces={[]} onCreate={onCreate} />);
    expect(screen.getByText('No workspaces yet.')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('create-workspace'));
    expect(onCreate).toHaveBeenCalled();
  });

  it('renders a new workspace action when cards exist', () => {
    const onCreate = jest.fn();
    render(<WorkspaceGrid workspaces={workspaces} onCreate={onCreate} />);
    fireEvent.click(screen.getByTestId('new-workspace'));
    expect(onCreate).toHaveBeenCalled();
  });
});
