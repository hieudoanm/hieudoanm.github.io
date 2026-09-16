import { cleanup, render, screen } from '@testing-library/react';

import { mockThree } from '@/games/maths/attractors/three.mock';
import AttractorsPage from '../page';

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

describe('AttractorsPage', () => {
  beforeEach(() => {
    window.requestAnimationFrame = jest.fn(() => 1) as never;
    window.cancelAnimationFrame = jest.fn() as never;
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('renders the attractor page', () => {
    render(<AttractorsPage />);
    expect(
      screen.getByRole('combobox', { name: 'Attractor' })
    ).toBeInTheDocument();
  });
});
