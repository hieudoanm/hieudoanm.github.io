import { fireEvent, render, screen } from '@testing-library/react';
import { SpeedDial } from '../SpeedDial';

describe('SpeedDial', () => {
  const actions = [{ label: 'Compose', onClick: jest.fn() }];

  it('toggles the action list', () => {
    render(<SpeedDial triggerIcon={<span>+</span>} actions={actions} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open quick actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'Compose' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Close quick actions' })
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('runs an action and closes the menu', () => {
    const onCompose = jest.fn();
    render(
      <SpeedDial
        triggerIcon={<span>+</span>}
        actions={[{ label: 'Compose', onClick: onCompose }]}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open quick actions' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Compose' }));
    expect(onCompose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
