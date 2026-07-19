import { type FC } from 'react';
import { formatMoney } from '@/lib/pos';

interface MoneyProps {
  amount: number;
  mono?: boolean;
  className?: string;
}

export const Money: FC<MoneyProps> = ({
  amount,
  mono = false,
  className = '',
}) => (
  <span className={`${mono ? 'font-mono' : ''} ${className}`.trim()}>
    {formatMoney(amount)}
  </span>
);
