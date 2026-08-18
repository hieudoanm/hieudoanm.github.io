import { render, screen } from '@testing-library/react';
import Loading from '../loading';

describe('loading', () => {
  it('renders loading spinner', () => {
    const { container } = render(<Loading />);
    expect(container.querySelector('.loading')).toBeTruthy();
  });
});
