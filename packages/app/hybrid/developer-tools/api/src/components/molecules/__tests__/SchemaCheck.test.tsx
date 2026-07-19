import { render, screen, fireEvent } from '@testing-library/react';
import { SchemaCheck } from '../SchemaCheck';

describe('SchemaCheck', () => {
  it('renders nothing for a non-JSON body', () => {
    const { container } = render(<SchemaCheck body="<html>not json</html>" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('auto-infers a schema and reports it valid', () => {
    render(<SchemaCheck body='{"name":"Ada"}' />);
    expect(screen.getByText('JSON Schema')).toBeInTheDocument();
    expect(screen.getByText('Valid')).toBeInTheDocument();
    expect(screen.getByText('Copy schema')).toBeInTheDocument();
    const value = (screen.getByLabelText('JSON schema') as HTMLTextAreaElement)
      .value;
    expect(value).toContain('"type": "object"');
    expect(value).toContain('"name"');
  });

  it('marks the schema invalid when the body violates it', () => {
    render(<SchemaCheck body='{"name":"Ada"}' />);
    fireEvent.change(screen.getByLabelText('JSON schema'), {
      target: {
        value: JSON.stringify({
          type: 'object',
          properties: {},
          required: ['missing'],
        }),
      },
    });
    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('missing');
  });

  it('reports invalid JSON schema text', () => {
    render(<SchemaCheck body='{"name":"Ada"}' />);
    fireEvent.change(screen.getByLabelText('JSON schema'), {
      target: { value: '{not json' },
    });
    expect(screen.getByText('Schema is not valid JSON')).toBeInTheDocument();
  });

  it('rejects a schema that is not an object', () => {
    render(<SchemaCheck body='{"name":"Ada"}' />);
    fireEvent.change(screen.getByLabelText('JSON schema'), {
      target: { value: '42' },
    });
    expect(screen.getByText('Schema must be an object')).toBeInTheDocument();
  });

  it('lists validation errors for array items', () => {
    render(<SchemaCheck body='[{"name":"Ada"}]' />);
    fireEvent.change(screen.getByLabelText('JSON schema'), {
      target: {
        value: JSON.stringify({
          type: 'array',
          items: {
            type: 'object',
            properties: {},
            required: ['id'],
          },
        }),
      },
    });
    expect(screen.getByRole('alert')).toHaveTextContent('$[0]');
  });

  it('copies the inferred schema', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    render(<SchemaCheck body='{"name":"Ada"}' />);
    fireEvent.click(screen.getByText('Copy schema'));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });
});
