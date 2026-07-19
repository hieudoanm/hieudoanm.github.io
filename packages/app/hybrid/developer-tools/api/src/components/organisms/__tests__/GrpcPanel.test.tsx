import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GrpcPanel } from '../GrpcPanel';

describe('GrpcPanel', () => {
  it('parses the default proto and lists methods', () => {
    render(<GrpcPanel />);
    expect(screen.getByText('SayHello')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('demo')).toBeInTheDocument();
  });

  it('re-parses the default proto on click', () => {
    render(<GrpcPanel />);
    fireEvent.click(screen.getByText('Parse Proto'));
    expect(screen.getByText('SayHello')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('shows method metadata', () => {
    render(<GrpcPanel />);
    expect(screen.getByText(/HelloRequest → HelloReply/)).toBeInTheDocument();
  });

  it('invokes a method and shows a mock response', async () => {
    render(<GrpcPanel />);
    fireEvent.click(screen.getByText('Invoke'));
    await waitFor(() => {
      expect(screen.getByText(/"method": "SayHello"/)).toBeInTheDocument();
    });
    expect(screen.getByText(/"streaming": "unary"/)).toBeInTheDocument();
  });

  it('switches the selected service', () => {
    render(<GrpcPanel />);
    fireEvent.change(screen.getByLabelText('Service'), {
      target: { value: 'Greeter' },
    });
    expect(screen.getByLabelText('Method')).toHaveValue('SayHello');
  });

  it('switches to the streaming method', async () => {
    render(<GrpcPanel />);
    fireEvent.change(screen.getByLabelText('Method'), {
      target: { value: 'Chat' },
    });
    fireEvent.click(screen.getByText('Invoke'));
    await waitFor(() => {
      expect(screen.getByText(/mock stream \(1 message\)/)).toBeInTheDocument();
    });
  });

  it('shows an error for invalid request json', () => {
    render(<GrpcPanel />);
    fireEvent.change(screen.getByLabelText('gRPC request'), {
      target: { value: 'not-json' },
    });
    fireEvent.click(screen.getByText('Invoke'));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Request must be valid JSON'
    );
  });

  it('rejects proto sources without services', () => {
    render(<GrpcPanel />);
    fireEvent.change(screen.getByLabelText('Proto source'), {
      target: { value: 'syntax = "proto3";' },
    });
    fireEvent.click(screen.getByText('Parse Proto'));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'No services found in the .proto source.'
    );
  });
});
