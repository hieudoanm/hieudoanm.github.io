import { render, screen, fireEvent } from '@testing-library/react';
import { EnvVariablesEditor } from '../EnvVariablesEditor';
import { EnvironmentVariable } from '@/types/api-client';

const env: EnvironmentVariable[] = [
  { id: '1', key: 'host', value: 'api.example.com', enabled: true },
  { id: '2', key: 'token', value: 'secret', enabled: false },
];

describe('EnvVariablesEditor', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders variables with keys and values', () => {
    render(<EnvVariablesEditor env={env} onChange={onChange} />);
    const keys = screen.getAllByLabelText('Environment variable key');
    expect(keys[0]).toHaveValue('host');
    expect(keys[1]).toHaveValue('token');
    expect(
      screen.getAllByLabelText('Environment variable value')[1]
    ).toHaveValue('secret');
  });

  it('updates a variable key', () => {
    render(<EnvVariablesEditor env={env} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Environment variable key')[0], {
      target: { value: 'baseUrl' },
    });
    expect(onChange).toHaveBeenCalledWith([
      { ...env[0], key: 'baseUrl' },
      env[1],
    ]);
  });

  it('toggles the enabled flag', () => {
    render(<EnvVariablesEditor env={env} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Enable variable token'));
    expect(onChange).toHaveBeenCalledWith([
      env[0],
      { ...env[1], enabled: true },
    ]);
  });

  it('removes a variable', () => {
    render(<EnvVariablesEditor env={env} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Remove variable token'));
    expect(onChange).toHaveBeenCalledWith([env[0]]);
  });

  it('adds a variable', () => {
    render(<EnvVariablesEditor env={env} onChange={onChange} />);
    fireEvent.click(screen.getByText('Add variable'));
    expect(onChange).toHaveBeenCalledWith([
      ...env,
      expect.objectContaining({ key: '', value: '', enabled: true }),
    ]);
  });
});
