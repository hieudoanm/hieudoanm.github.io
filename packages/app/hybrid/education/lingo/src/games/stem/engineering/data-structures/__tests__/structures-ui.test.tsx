import { fireEvent, render, screen } from '@testing-library/react';
import {
  ArraySimulator,
  QueueSimulator,
  StackSimulator,
} from '../linear-structures';
import {
  LinkedListSimulator,
  appendNode,
  listLength,
  walkFor,
} from '../linked-list';
import {
  DisjointSetSimulator,
  HashTableSimulator,
  SuffixArraySimulator,
  TrieSimulator,
} from '../structures';

const note = () => screen.getByTestId('step-note').textContent ?? '';

describe('ArraySimulator', () => {
  it('starts empty and reports no probes', () => {
    render(<ArraySimulator />);
    expect(note()).toMatch(/Add a value to begin/);
  });

  it('appends a parsed value and clears the input', () => {
    render(<ArraySimulator />);
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '42' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Append' }));
    expect(screen.getByLabelText('Value')).toHaveValue('');
    expect(screen.getByTestId('occupied')).toHaveTextContent('1/10');
  });

  it('ignores a non-numeric value', () => {
    render(<ArraySimulator />);
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Append' }));
    expect(screen.getByTestId('occupied')).toHaveTextContent('0/10');
  });

  it('scans and reports the matching slot', () => {
    render(<ArraySimulator />);
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '7' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Append' }));
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '7' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Linear scan' }));
    expect(screen.getByTestId('step-note')).not.toHaveTextContent(
      /Add a value/
    );
  });
});

describe('StackSimulator', () => {
  it('labels the operations as push and pop', () => {
    render(<StackSimulator />);
    expect(screen.getByRole('button', { name: 'Push' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pop' })).toBeInTheDocument();
  });

  it('pops the most recently pushed value', () => {
    render(<StackSimulator />);
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Push' }));
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Push' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    expect(screen.getByTestId('occupied')).toHaveTextContent('1/8');
  });

  it('reports an empty pop without going negative', () => {
    render(<StackSimulator />);
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    expect(screen.getByTestId('occupied')).toHaveTextContent('0/8');
  });
});

describe('QueueSimulator', () => {
  it('labels the operations as enqueue and dequeue', () => {
    render(<QueueSimulator />);
    expect(screen.getByRole('button', { name: 'Enqueue' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dequeue' })).toBeInTheDocument();
  });

  it('dequeues in FIFO order', () => {
    render(<QueueSimulator />);
    for (const v of ['1', '2']) {
      fireEvent.change(screen.getByLabelText('Value'), {
        target: { value: v },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Enqueue' }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    expect(screen.getByTestId('occupied')).toHaveTextContent('1/8');
  });
});

describe('linked-list model', () => {
  it('links appended nodes in order', () => {
    const nodes = appendNode(appendNode(appendNode([], 1), 2), 3);
    expect(nodes.map((n) => n.value)).toEqual([1, 2, 3]);
    expect(nodes[0].next).toBe(1);
    expect(nodes[2].next).toBeNull();
  });

  it('counts every node for a value that is absent', () => {
    const nodes = appendNode(appendNode([], 1), 2);
    expect(listLength(nodes)).toBe(2);
  });

  it('stops walking once the target is found', () => {
    const nodes = appendNode(appendNode(appendNode([], 1), 2), 3);
    expect(walkFor(nodes, 2)).toEqual([0, 1]);
  });
});

describe('LinkedListSimulator', () => {
  it('renders the seeded nodes', () => {
    render(<LinkedListSimulator />);
    expect(screen.getByTestId('node-0')).toHaveTextContent('12');
    expect(screen.getByTestId('node-2')).toHaveTextContent('27');
  });

  it('finds an existing value', () => {
    render(<LinkedListSimulator />);
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '5' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Find' }));
    expect(note()).toMatch(/Found 5 after 2 node visits/);
  });

  it('reports a miss after reaching the end', () => {
    render(<LinkedListSimulator />);
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '999' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Find' }));
    expect(note()).toMatch(/without finding 999/);
  });

  it('clears to an empty list', () => {
    render(<LinkedListSimulator />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByTestId('linked-list')).toHaveTextContent('empty');
  });
});

describe('TrieSimulator', () => {
  it('inserts a word and reports it as present', () => {
    render(<TrieSimulator />);
    fireEvent.change(screen.getByLabelText('Add a word'), {
      target: { value: 'zebra' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Insert' }));
    fireEvent.change(screen.getByLabelText('Query'), {
      target: { value: 'zebra' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(note()).toMatch(/is in the set/);
  });

  it('reports a proper prefix as not a complete word', () => {
    render(<TrieSimulator />);
    fireEvent.change(screen.getByLabelText('Query'), {
      target: { value: 'ca' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(note()).toMatch(/not a complete word/);
  });

  it('reports a genuinely absent word', () => {
    render(<TrieSimulator />);
    fireEvent.change(screen.getByLabelText('Query'), {
      target: { value: 'quail' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(note()).toMatch(/is not in the set/);
  });
});

describe('HashTableSimulator', () => {
  it('finds a key in an empty bucket after one probe', () => {
    render(<HashTableSimulator />);
    fireEvent.change(screen.getByLabelText('Key'), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: 'Insert' }));
    fireEvent.change(screen.getByLabelText('Key'), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: 'Lookup' }));
    expect(note()).toMatch(/is found after 1 probe/);
  });

  it('reports an absent key in an empty bucket', () => {
    render(<HashTableSimulator />);
    fireEvent.change(screen.getByLabelText('Key'), { target: { value: '4' } });
    fireEvent.click(screen.getByRole('button', { name: 'Lookup' }));
    expect(note()).toMatch(/is empty, so 4 is absent in one probe/);
  });

  it('resolves a collision by searching the chain', () => {
    render(<HashTableSimulator />);
    for (const k of ['1', '12']) {
      fireEvent.change(screen.getByLabelText('Key'), { target: { value: k } });
      fireEvent.click(screen.getByRole('button', { name: 'Insert' }));
    }
    fireEvent.change(screen.getByLabelText('Key'), { target: { value: '12' } });
    fireEvent.click(screen.getByRole('button', { name: 'Lookup' }));
    expect(note()).toMatch(/hashes to bucket 1 and is found after 2 probe/);
  });

  it('ignores a duplicate insert', () => {
    render(<HashTableSimulator />);
    for (let i = 0; i < 2; i += 1) {
      fireEvent.change(screen.getByLabelText('Key'), {
        target: { value: '5' },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Insert' }));
    }
    expect(screen.getByTestId('keys')).toHaveTextContent('1');
  });
});

describe('SuffixArraySimulator', () => {
  it('sorts banana into the expected suffix order', () => {
    render(<SuffixArraySimulator />);
    const list = screen.getByTestId('pre').textContent ?? '';
    expect(list).toContain('ana');
    expect(list).toContain('banana');
  });

  it('rebuilds when the input changes', () => {
    render(<SuffixArraySimulator />);
    fireEvent.change(screen.getByLabelText('String'), {
      target: { value: 'abab' },
    });
    expect(screen.getByTestId('length')).toHaveTextContent('4');
  });
});

describe('DisjointSetSimulator', () => {
  it('starts with one component per element', () => {
    render(<DisjointSetSimulator />);
    expect(screen.getByTestId('components')).toHaveTextContent('8');
  });

  it('merges two components into one', () => {
    render(<DisjointSetSimulator />);
    const buttons = screen.getAllByRole('button', {
      name: /^union\(\d+, \d+\)$/,
    });
    fireEvent.click(buttons[0]);
    expect(screen.getByTestId('components')).toHaveTextContent('7');
  });

  it('reports a union inside an existing component as a no-op', () => {
    render(<DisjointSetSimulator />);
    const buttons = screen.getAllByRole('button', {
      name: /^union\(\d+, \d+\)$/,
    });
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    expect(note()).toMatch(/already in the same component/);
  });

  it('resets to a different element count', () => {
    render(<DisjointSetSimulator />);
    fireEvent.click(screen.getByRole('button', { name: 'Reset to 4' }));
    expect(screen.getByTestId('elements')).toHaveTextContent('4');
    expect(screen.getByTestId('components')).toHaveTextContent('4');
  });
});
