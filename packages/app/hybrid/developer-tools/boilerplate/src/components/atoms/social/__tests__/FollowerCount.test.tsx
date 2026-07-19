import { render, screen } from '@testing-library/react';
import { FollowerCount } from '../FollowerCount';

describe('FollowerCount', () => {
  it('renders raw count below one thousand', () => {
    render(<FollowerCount count={950} />);
    expect(screen.getByTestId('follower-count')).toHaveTextContent(
      '950 followers'
    );
  });

  it('formats thousands', () => {
    render(<FollowerCount count={1200} />);
    expect(screen.getByTestId('follower-count')).toHaveTextContent('1.2k');
  });

  it('formats millions', () => {
    render(<FollowerCount count={2500000} />);
    expect(screen.getByTestId('follower-count')).toHaveTextContent('2.5M');
  });

  it('renders custom label', () => {
    render(<FollowerCount count={42} label="fans" />);
    expect(screen.getByTestId('follower-count')).toHaveTextContent('42 fans');
  });
});
