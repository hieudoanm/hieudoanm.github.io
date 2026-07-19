import { render, screen, fireEvent } from '@testing-library/react';
import { ProtocolSwitch } from '../ProtocolSwitch';

describe('ProtocolSwitch', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all protocols with http active', () => {
    render(<ProtocolSwitch value="http" onChange={onChange} />);
    expect(screen.getByText('HTTP')).toBeInTheDocument();
    expect(screen.getByText('WS')).toBeInTheDocument();
    expect(screen.getByText('gRPC')).toBeInTheDocument();
    expect(screen.getByText('MQTT')).toBeInTheDocument();
    expect(screen.getByText('HTTP').closest('button')).toHaveClass(
      'tab-active'
    );
  });

  it('switches protocol on click', () => {
    render(<ProtocolSwitch value="http" onChange={onChange} />);
    fireEvent.click(screen.getByText('MQTT'));
    expect(onChange).toHaveBeenCalledWith('mqtt');
  });

  it('marks the selected protocol as active', () => {
    render(<ProtocolSwitch value="grpc" onChange={onChange} />);
    expect(screen.getByText('gRPC').closest('button')).toHaveClass(
      'tab-active'
    );
  });
});
