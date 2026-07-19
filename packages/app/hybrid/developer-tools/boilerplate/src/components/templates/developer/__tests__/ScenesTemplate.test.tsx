import { fireEvent, render, screen } from '@testing-library/react';
import { ScenesTemplate } from '../ScenesTemplate';

describe('ScenesTemplate', () => {
  it('lists all scenes with device counts', () => {
    render(<ScenesTemplate />);
    expect(screen.getByRole('heading', { name: 'Scenes' })).toBeInTheDocument();
    expect(screen.getByText('4 scenes')).toBeInTheDocument();
    expect(screen.getByText('Movie Night')).toBeInTheDocument();
    expect(screen.getByText('Goodnight')).toBeInTheDocument();
    expect(screen.getByText('5 devices')).toBeInTheDocument();
    expect(screen.getAllByText('Not active')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Activate' })).toHaveLength(4);
  });

  it('activates and deactivates a scene', () => {
    render(<ScenesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Activate' })[0]);
    expect(screen.getByText('Scene active')).toBeInTheDocument();
    expect(screen.getAllByText('Not active')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Deactivate' })).toHaveLength(
      1
    );
    fireEvent.click(screen.getByRole('button', { name: 'Deactivate' }));
    expect(screen.getAllByText('Not active')).toHaveLength(4);
    expect(screen.queryByText('Scene active')).not.toBeInTheDocument();
  });
});
