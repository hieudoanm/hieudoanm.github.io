import { render } from '@testing-library/react';
import { WebTag } from '../WebTag';

const MockChild = (props: { label?: string }) => <span>{props.label}</span>;

describe('WebTag', () => {
  it('wraps the child component in the given tag', () => {
    const Wrapped = WebTag('section', MockChild);
    const { container } = render(<Wrapped />);
    expect(container.querySelector('section')).toBeTruthy();
  });

  it('renders the child inside the wrapper tag', () => {
    const Wrapped = WebTag('article', MockChild);
    const { container } = render(<Wrapped label="Hello" />);
    const article = container.querySelector('article');
    expect(article).toBeTruthy();
    expect(article?.querySelector('span')?.textContent).toBe('Hello');
  });

  it('forwards props to the child component', () => {
    const Wrapped = WebTag('div', MockChild);
    const { container } = render(<Wrapped label="Forwarded" />);
    expect(container.querySelector('span')?.textContent).toBe('Forwarded');
  });

  it('supports different intrinsic element types', () => {
    const Wrapped = WebTag('footer', MockChild);
    const { container } = render(<Wrapped label="x" />);
    expect(container.querySelector('footer')).toBeTruthy();
  });

  it('reuses the same wrapper component for multiple instances', () => {
    const Wrapped = WebTag('main', MockChild);
    const { container } = render(
      <>
        <Wrapped label="First" />
        <Wrapped label="Second" />
      </>
    );
    const mains = container.querySelectorAll('main');
    expect(mains.length).toBe(2);
    expect(mains[0].textContent).toBe('First');
    expect(mains[1].textContent).toBe('Second');
  });
});
