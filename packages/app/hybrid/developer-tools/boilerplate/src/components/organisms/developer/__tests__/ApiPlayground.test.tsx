import { fireEvent, render, screen } from '@testing-library/react';
import { ApiPlayground } from '../ApiPlayground';

describe('ApiPlayground', () => {
  it('renders method tabs and path input', () => {
    render(<ApiPlayground />);
    expect(screen.getByRole('tab', { name: 'GET' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'POST' })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Request path' })
    ).toBeInTheDocument();
  });

  it('sends a request and shows a response', () => {
    const onSend = jest.fn();
    render(<ApiPlayground onSend={onSend} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Request path' }), {
      target: { value: '/api/v1/posts' },
    });
    fireEvent.click(screen.getByTestId('api-send'));
    expect(onSend).toHaveBeenCalledWith({
      method: 'GET',
      path: '/api/v1/posts',
      body: '',
    });
    expect(screen.getByText('GET /api/v1/posts — 200 OK')).toBeInTheDocument();
  });

  it('switches the active method tab', () => {
    render(<ApiPlayground />);
    fireEvent.click(screen.getByRole('tab', { name: 'POST' }));
    expect(screen.getByRole('tab', { name: 'POST' })).toHaveClass('tab-active');
  });
});
