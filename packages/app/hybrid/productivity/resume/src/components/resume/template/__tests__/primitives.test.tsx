import { render, screen } from '@testing-library/react';
import {
  BulletList,
  ContactList,
  HeaderRow,
  Section,
  TextBlock,
} from '../primitives';

describe('resume primitives', () => {
  it('renders a section title and children', () => {
    render(
      <Section title="Experience">
        <p>Body</p>
      </Section>
    );
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('renders a section divider when provided', () => {
    const { container } = render(
      <Section title="Skills" titleDividerStyle={{ height: 1 }}>
        <p>x</p>
      </Section>
    );
    expect(container.querySelector('div[style*="height: 1px"]')).not.toBeNull();
  });

  it('renders a text block preserving line breaks', () => {
    render(<TextBlock text={'First line.\nSecond line.'} />);
    expect(
      screen.getByText(/First line\.\s*Second line\./)
    ).toBeInTheDocument();
  });

  it('renders bullet list lines', () => {
    render(<BulletList text={'Bullet A\nBullet B'} />);
    expect(screen.getByText('Bullet A')).toBeInTheDocument();
    expect(screen.getByText('Bullet B')).toBeInTheDocument();
  });

  it('renders no bullets for blank text', () => {
    render(<BulletList text="  " />);
    expect(screen.queryByText('•')).not.toBeInTheDocument();
  });

  it('renders a header row with secondary and right values', () => {
    render(<HeaderRow primary="Role" secondary="Company" right="2022" />);
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('renders a header row without optional values', () => {
    render(<HeaderRow primary="Role" />);
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.queryByText('Company')).not.toBeInTheDocument();
  });

  it('filters blank contact items', () => {
    render(<ContactList items={['a@b.com', '  ']} />);
    expect(screen.getByText('a@b.com')).toBeInTheDocument();
  });
});
