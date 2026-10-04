import { fireEvent, render, screen } from '@testing-library/react';
import { drawNumbers } from '../utils';
import { Keno } from '../index';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return { ...actual, drawNumbers: jest.fn(() => actual.drawNumbers()) };
});

const { drawNumbers: mockedDraw } = jest.requireMock('../utils') as {
  drawNumbers: jest.Mock;
};

describe('Keno', () => {
  it('renders the eighty-number grid', () => {
    render(<Keno />);
    expect(screen.getByTestId('keno-number-1')).toBeInTheDocument();
    expect(screen.getByTestId('keno-number-80')).toBeInTheDocument();
    expect(screen.getByTestId('keno-play')).toBeDisabled();
  });

  it('selects spots, draws and shows the result', () => {
    mockedDraw.mockReturnValue(
      Array.from({ length: 20 }, (_, index) => index * 4 + 1)
    );
    render(<Keno />);
    fireEvent.click(screen.getByTestId('keno-number-1'));
    fireEvent.click(screen.getByTestId('keno-play'));
    expect(screen.getByTestId('keno-result')).toHaveTextContent(/1 catch/);
    expect(screen.getByTestId('keno-result')).toHaveTextContent(/\+30/);
  });

  it('clears the selection', () => {
    render(<Keno />);
    fireEvent.click(screen.getByTestId('keno-number-4'));
    expect(screen.getByTestId('keno-number-4').className).toContain(
      'btn-primary'
    );
    fireEvent.click(screen.getByTestId('keno-clear'));
    expect(screen.getByTestId('keno-play')).toBeDisabled();
  });
});
