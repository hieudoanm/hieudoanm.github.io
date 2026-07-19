import { render, screen } from '@testing-library/react';
import { KeyValue } from '../KeyValue';

describe('KeyValue', () => {
  it('renders title and key/value pairs', () => {
    render(
      <KeyValue
        title="Metadata"
        items={[
          { key: 'Version', value: '1.0.0' },
          { key: 'License', value: 'MIT' },
        ]}
      />
    );
    expect(screen.getByText('Metadata')).toBeInTheDocument();
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
    expect(screen.getByText('License')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('renders ReactNode values', () => {
    render(
      <KeyValue
        items={[
          {
            key: 'Status',
            value: <span className="text-success">Active</span>,
          },
        ]}
      />
    );
    expect(screen.getByText('Active')).toHaveClass('text-success');
  });
});
