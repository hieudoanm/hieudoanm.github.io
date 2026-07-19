import { render, screen } from '@testing-library/react';
import { SWProvider } from '../SWProvider';

jest.mock('@/hooks/useSWRegister');

import { useSWRegister } from '@/hooks/useSWRegister';

describe('SWProvider', () => {
  it('calls useSWRegister and renders children', () => {
    (useSWRegister as jest.Mock).mockReturnValue(undefined);
    render(
      <SWProvider>
        <p>App</p>
      </SWProvider>
    );
    expect(useSWRegister).toHaveBeenCalled();
    expect(screen.getByText('App')).toBeInTheDocument();
  });
});
