import { render, screen } from '@testing-library/react';
import { EnvironmentSelector } from '../EnvironmentSelector';

describe('EnvironmentSelector', () => {
  const environments: {
    id: string;
    name: string;
    url: string;
    status: 'online' | 'offline';
  }[] = [
    { id: 'dev', name: 'Development', url: 'localhost:3000', status: 'online' },
    {
      id: 'prod',
      name: 'Production',
      url: 'app.example.com',
      status: 'offline',
    },
  ];

  it('renders environments with urls and statuses', () => {
    render(
      <EnvironmentSelector
        environments={environments}
        selected="dev"
        title="Environments"
      />
    );
    expect(screen.getByText('Environments')).toBeInTheDocument();
    expect(screen.getAllByText('Development').length).toBeGreaterThan(0);
    expect(screen.getByText('localhost:3000')).toBeInTheDocument();
    expect(screen.getByText('offline')).toBeInTheDocument();
  });

  it('renders a select with the selected environment', () => {
    render(<EnvironmentSelector environments={environments} selected="prod" />);
    const select = screen.getByRole('combobox', { name: 'Environment' });
    expect(select).toHaveValue('prod');
    expect(select).toHaveDisplayValue('Production');
  });
});
