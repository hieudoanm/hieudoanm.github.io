import { render, screen } from '@testing-library/react';
import { Terminal } from '../Terminal';

describe('Terminal', () => {
  it('to match snapshot', () => {
    const { container } = render(<Terminal />);
    expect(container).toMatchSnapshot();
  });

  it('renders lines with prefixes', () => {
    render(
      <Terminal
        lines={[
          { prefix: '$', text: 'npm i daisyui' },
          { prefix: '>', text: 'installing...' },
        ]}
      />
    );
    expect(screen.getByText('npm i daisyui')).toBeInTheDocument();
    expect(screen.getByText('installing...')).toBeInTheDocument();
  });

  it('renders highlighted line', () => {
    render(
      <Terminal
        lines={[
          { prefix: '$', text: 'npm i daisyui' },
          { prefix: '>', text: 'error', highlight: true },
        ]}
      />
    );
    const highlighted = screen.getByText('error').closest('pre');
    expect(highlighted).toHaveClass('bg-warning');
  });

  it('renders children when no lines prop', () => {
    render(
      <Terminal>
        <pre data-prefix="$">
          <code>custom line</code>
        </pre>
      </Terminal>
    );
    expect(screen.getByText('custom line')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Terminal className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
