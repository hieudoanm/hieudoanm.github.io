import DictatorPage from '@/app/(games)/social-preferences/dictator/page';
import { render, screen } from '@testing-library/react';

describe('DictatorPage', () => {
  it('renders the dictator game', () => {
    render(<DictatorPage />);
    expect(
      screen.getByRole('heading', { name: /Dictator Game/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Give' })).toBeInTheDocument();
  });
});
