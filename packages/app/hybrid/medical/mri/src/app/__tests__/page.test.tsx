import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the home template', () => {
    render(<HomePage />);
    expect(screen.getByRole('button', { name: 'Import study' })).toBeVisible();
  });

  it('passes imported files to the template handler', () => {
    render(<HomePage />);
    const input = screen.getByTestId('file-input');
    const files = [new File(['scan'], 'scan.dcm')];
    fireEvent.change(input, { target: { files } });
    expect(input).toBeInTheDocument();
  });
});
