import { render, screen, fireEvent } from '@testing-library/react';
import SwipeableTransactionItem from '../SwipeableTransactionItem';
import type { Transaction } from '@/types';

jest.mock('@/hooks/useHaptic', () => ({
  useHaptic: () => ({ vibrate: jest.fn() }),
}));

jest.mock('@/utils/iconMap', () => ({
  getTransactionIcon: () => {
    const React = require('react');
    return (props: React.HTMLAttributes<HTMLSpanElement>) =>
      React.createElement('span', { ...props, 'data-testid': 'icon' });
  },
}));

const mockTx: Transaction = {
  id: 'tx-1',
  accountId: 'a1',
  title: 'Coffee Shop',
  category: 'Food & Drink',
  amount: -5.5,
  currency: 'USD',
  date: '2026-08-10T08:30:00',
  type: 'expense',
};

const incomeTx: Transaction = {
  ...mockTx,
  id: 'tx-2',
  title: 'Paycheck',
  category: 'Income',
  amount: 3000,
  type: 'income',
};

describe('SwipeableTransactionItem', () => {
  describe('rendering', () => {
    it('renders transaction title', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
    });

    it('renders category name', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      expect(screen.getByText(/Food & Drink/)).toBeInTheDocument();
    });

    it('renders date when showDate is true (default)', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      expect(screen.getByText(/Food & Drink ·/)).toBeInTheDocument();
    });

    it('hides date when showDate is false', () => {
      render(
        <SwipeableTransactionItem transaction={mockTx} showDate={false} />
      );
      expect(screen.getByText('Food & Drink')).toBeInTheDocument();
      expect(screen.queryByText(/·/)).not.toBeInTheDocument();
    });

    it('renders negative amount with error styling', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      const el = screen.getByText('-$5.50');
      expect(el).toHaveClass('text-error');
    });

    it('renders positive amount with success styling and + prefix', () => {
      render(<SwipeableTransactionItem transaction={incomeTx} />);
      const el = screen.getByText('+$3,000.00');
      expect(el).toHaveClass('text-success');
    });

    it('renders the icon', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('touch interactions', () => {
    const getContent = (): HTMLElement =>
      screen
        .getByText('Coffee Shop')
        .closest('[class*="relative"]') as HTMLElement;

    it('starts swiping on touchStart', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      const content = getContent();
      fireEvent.touchStart(content, { touches: [{ clientX: 200 }] });
      expect(content.style.transition).toBe('none');
    });

    it('moves content leftward on touchMove when swiping', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      const content = getContent();
      fireEvent.touchStart(content, { touches: [{ clientX: 200 }] });
      fireEvent.touchMove(content, { touches: [{ clientX: 120 }] });
      expect(content.style.transform).toBe('translateX(-80px)');
    });

    it('ignores touchMove when not swiping', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      const content = getContent();
      fireEvent.touchMove(content, { touches: [{ clientX: 100 }] });
      expect(content.style.transform).toBe('translateX(0px)');
    });

    it('clamps swipe offset to maximum of 0 (no rightward swipe)', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      const content = getContent();
      fireEvent.touchStart(content, { touches: [{ clientX: 100 }] });
      fireEvent.touchMove(content, { touches: [{ clientX: 200 }] });
      expect(content.style.transform).toBe('translateX(0px)');
    });

    it('clamps swipe offset to minimum of -120', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      const content = getContent();
      fireEvent.touchStart(content, { touches: [{ clientX: 300 }] });
      fireEvent.touchMove(content, { touches: [{ clientX: 50 }] });
      expect(content.style.transform).toBe('translateX(-120px)');
    });

    it('snaps back to 0 on touchEnd when offset >= -60', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      const content = getContent();
      fireEvent.touchStart(content, { touches: [{ clientX: 200 }] });
      fireEvent.touchMove(content, { touches: [{ clientX: 160 }] });
      fireEvent.touchEnd(content);
      expect(content.style.transform).toBe('translateX(0px)');
    });

    it('snaps to -120 on touchEnd when offset < -60', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      const content = getContent();
      fireEvent.touchStart(content, { touches: [{ clientX: 300 }] });
      fireEvent.touchMove(content, { touches: [{ clientX: 200 }] });
      fireEvent.touchEnd(content);
      expect(content.style.transform).toBe('translateX(-120px)');
    });
  });

  describe('action buttons', () => {
    it('calls onDelete with transaction id', () => {
      const onDelete = jest.fn();
      render(
        <SwipeableTransactionItem transaction={mockTx} onDelete={onDelete} />
      );
      fireEvent.click(screen.getByLabelText('Delete transaction'));
      expect(onDelete).toHaveBeenCalledWith('tx-1');
    });

    it('calls onArchive with transaction id', () => {
      const onArchive = jest.fn();
      render(
        <SwipeableTransactionItem transaction={mockTx} onArchive={onArchive} />
      );
      fireEvent.click(screen.getByLabelText('Archive transaction'));
      expect(onArchive).toHaveBeenCalledWith('tx-1');
    });

    it('does not throw when onDelete is not provided', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      expect(() => {
        fireEvent.click(screen.getByLabelText('Delete transaction'));
      }).not.toThrow();
    });

    it('does not throw when onArchive is not provided', () => {
      render(<SwipeableTransactionItem transaction={mockTx} />);
      expect(() => {
        fireEvent.click(screen.getByLabelText('Archive transaction'));
      }).not.toThrow();
    });

    it('resets offset to 0 after delete', () => {
      const onDelete = jest.fn();
      render(
        <SwipeableTransactionItem transaction={mockTx} onDelete={onDelete} />
      );
      const content = screen
        .getByText('Coffee Shop')
        .closest('[class*="relative"]') as HTMLElement;
      fireEvent.touchStart(content, { touches: [{ clientX: 300 }] });
      fireEvent.touchMove(content, { touches: [{ clientX: 200 }] });
      fireEvent.touchEnd(content);
      expect(content.style.transform).toBe('translateX(-120px)');
      fireEvent.click(screen.getByLabelText('Delete transaction'));
      expect(content.style.transform).toBe('translateX(0px)');
    });

    it('resets offset to 0 after archive', () => {
      const onArchive = jest.fn();
      render(
        <SwipeableTransactionItem transaction={mockTx} onArchive={onArchive} />
      );
      const content = screen
        .getByText('Coffee Shop')
        .closest('[class*="relative"]') as HTMLElement;
      fireEvent.touchStart(content, { touches: [{ clientX: 300 }] });
      fireEvent.touchMove(content, { touches: [{ clientX: 200 }] });
      fireEvent.touchEnd(content);
      expect(content.style.transform).toBe('translateX(-120px)');
      fireEvent.click(screen.getByLabelText('Archive transaction'));
      expect(content.style.transform).toBe('translateX(0px)');
    });
  });
});
