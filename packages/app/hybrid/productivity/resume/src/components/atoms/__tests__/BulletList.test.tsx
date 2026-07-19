import { render, screen } from '@testing-library/react';
import { BulletList } from '../BulletList';

describe('BulletList', () => {
  it('renders bullet list lines', () => {
    render(<BulletList text={'Bullet A\nBullet B'} />);
    expect(screen.getByText('Bullet A')).toBeInTheDocument();
    expect(screen.getByText('Bullet B')).toBeInTheDocument();
  });

  it('renders no bullets for blank text', () => {
    render(<BulletList text="  " />);
    expect(screen.queryByText('•')).not.toBeInTheDocument();
  });
});
