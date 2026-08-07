import { render, screen } from '@testing-library/react';
import { Portal } from '../Portal';

describe('Portal', () => {
  it('renders children into document.body', () => {
    render(<Portal>Ported</Portal>);
    expect(screen.getByText('Ported')).toBeInTheDocument();
    expect(document.body.contains(screen.getByText('Ported'))).toBe(true);
  });

  it('renders children into a custom container', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    render(<Portal container={host}>Custom</Portal>);
    expect(host).toContainElement(screen.getByText('Custom'));
  });
});
