import { render, screen } from '@testing-library/react';
import { ReporterName } from '../ReporterName';

describe('ReporterName', () => {
  it('renders the reporter name', () => {
    render(<ReporterName name="Jane Doe" />);
    expect(screen.getByTestId('reporter-name')).toHaveTextContent('Jane Doe');
  });

  it('renders default reporter role', () => {
    render(<ReporterName name="Jane Doe" />);
    expect(screen.getByTestId('reporter-name')).toHaveTextContent('Reporter');
  });

  it('renders custom role', () => {
    render(<ReporterName name="Jane Doe" role="Editor" />);
    expect(screen.getByTestId('reporter-name')).toHaveTextContent('Editor');
  });
});
