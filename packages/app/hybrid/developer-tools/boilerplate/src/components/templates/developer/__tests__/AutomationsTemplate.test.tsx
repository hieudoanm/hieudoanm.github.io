import { fireEvent, render, screen } from '@testing-library/react';
import { AutomationsTemplate } from '../AutomationsTemplate';

describe('AutomationsTemplate', () => {
  it('lists automations with toggles and status badges', () => {
    render(<AutomationsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Automations' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 automations')).toBeInTheDocument();
    expect(screen.getByText('Turn off lights at 11pm')).toBeInTheDocument();
    expect(screen.getByText('Start robot vacuum at 9am')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Turn off' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Turn on' })).toHaveLength(2);
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Paused')).toHaveLength(2);
  });

  it('toggles an automation on and off', () => {
    render(<AutomationsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Turn off' })[0]);
    expect(screen.getAllByRole('button', { name: 'Turn off' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Turn on' })).toHaveLength(3);
    expect(screen.getAllByText('Paused')).toHaveLength(3);
    fireEvent.click(screen.getAllByRole('button', { name: 'Turn on' })[0]);
    expect(screen.getAllByRole('button', { name: 'Turn off' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Turn on' })).toHaveLength(2);
  });
});
