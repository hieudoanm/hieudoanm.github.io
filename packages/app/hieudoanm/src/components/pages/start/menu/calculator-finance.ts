import { PiCurrencyDollar, PiFlag, PiMoney } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Inflation',
    description: 'Calculator',
    tags: ['finance', 'money', 'financial', 'math', 'arithmetic'],
    icon: PiMoney,
    onClick: open('inflation'),
  },
  {
    label: 'Split Bill',
    description: 'Calculator',
    tags: ['finance', 'money', 'financial', 'math', 'arithmetic'],
    icon: PiCurrencyDollar,
    onClick: open('split-bill'),
  },
  {
    label: 'Tax',
    description: 'Vietnam PIT',
    tags: ['finance', 'money', 'financial', 'calculator'],
    icon: PiFlag,
    onClick: open('tax'),
  },
];
