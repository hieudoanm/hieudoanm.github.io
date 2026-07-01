import {
  PiBrain,
  PiCode,
  PiNumberSquareOne,
  PiPi,
  PiQuestion,
} from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Memory Match',
    description: 'Find matching pairs',
    tags: ['memory', 'brain', 'cognitive', 'game'],
    icon: PiBrain,
    onClick: open('memory-match'),
  },
  {
    label: 'N-Back',
    description: 'Working memory',
    tags: ['memory', 'brain', 'cognitive', 'game'],
    icon: PiNumberSquareOne,
    onClick: open('n-back'),
  },
  {
    label: 'PI',
    description: 'Memorization',
    tags: ['memory', 'brain', 'cognitive', 'game'],
    icon: PiPi,
    onClick: open('pi'),
  },
  {
    label: 'Quizify',
    description: 'Quiz',
    tags: ['memory', 'brain', 'cognitive', 'game'],
    icon: PiQuestion,
    onClick: open('quizify'),
  },
  {
    label: 'Recall',
    description: 'Memorization',
    tags: ['memory', 'brain', 'cognitive', 'game'],
    icon: PiCode,
    onClick: open('recall'),
  },
];
