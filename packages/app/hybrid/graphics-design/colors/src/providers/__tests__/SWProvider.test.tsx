import { render, screen } from '@testing-library/react';
import { SWProvider } from '../SWProvider';

jest.mock('@/hooks/useSWRegister');
import { useSWRegister } from '@/hooks/useSWRegister';

const mockedUseSWRegister = useSWRegister as jest.Mock;

describe('SWProvider', () => {
  beforeEach(() => {
    mockedUseSWRegister.mockReset();
  });

  it('calls useSWRegister on render', () => {
    render(<SWProvider>child</SWProvider>);
    expect(mockedUseSWRegister).toHaveBeenCalled();
  });

  it('renders its children', () => {
    render(
      <SWProvider>
        <span>hello</span>
      </SWProvider>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
