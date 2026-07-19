import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { mockThree } from '../three.mock';
import { Attractors } from '../index';

jest.mock('three', () => mockThree);
jest.mock('three/addons/controls/OrbitControls.js', () => ({
  OrbitControls: class MockOrbitControls {
    enableDamping = false;
    dampingFactor = 0;
    autoRotate = false;
    autoRotateSpeed = 0;
    update = jest.fn();
  },
}));

describe('Attractors', () => {
  beforeEach(() => {
    window.requestAnimationFrame = jest.fn(() => 1) as never;
    window.cancelAnimationFrame = jest.fn() as never;
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('renders the scene container and an attractor select', () => {
    render(<Attractors />);
    const select = screen.getByRole('combobox', { name: 'Attractor' });
    expect(select).toBeInTheDocument();
    expect(
      screen.getByText('Drag to orbit · Scroll to zoom')
    ).toBeInTheDocument();
  });

  it('defaults to the Lorenz attractor', () => {
    render(<Attractors />);
    const select = screen.getByRole('combobox', {
      name: 'Attractor',
    }) as HTMLSelectElement;
    expect(select.value).toBe('lorenz');
  });

  it('lists all five attractors as options', () => {
    render(<Attractors />);
    const select = screen.getByRole('combobox', { name: 'Attractor' });
    const options = Array.from(select.querySelectorAll('option')).map(
      (o) => o.textContent
    );
    expect(options).toEqual([
      'Lorenz',
      'Aizawa',
      'Thomas',
      'Halvorsen',
      'Arneodo',
    ]);
  });

  it('switches the active attractor on selection', () => {
    render(<Attractors />);
    const select = screen.getByRole('combobox', {
      name: 'Attractor',
    }) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'thomas' } });
    expect(select.value).toBe('thomas');
  });

  it('ignores changes during an in-flight transition', () => {
    render(<Attractors />);
    const select = screen.getByRole('combobox', {
      name: 'Attractor',
    }) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'thomas' } });
    fireEvent.change(select, { target: { value: 'aizawa' } });
    expect(select.value).toBe('thomas');
  });

  it('keeps the same attractor when reselected', () => {
    render(<Attractors />);
    const select = screen.getByRole('combobox', {
      name: 'Attractor',
    }) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'lorenz' } });
    expect(select.value).toBe('lorenz');
  });
});
