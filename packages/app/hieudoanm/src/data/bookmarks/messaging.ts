import {
  PiAirplane,
  PiCodeSimple,
  PiGameController,
  PiHeart,
} from 'react-icons/pi';
import { ItemCardProps } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';

export const messaging: ItemCardProps[] = [
  {
    label: 'Discord',
    href: 'https://discord.com',
    description: 'Messaging',
    icon: PiGameController, // gaming / community vibe
    //color: '#5865f2',
  },
  {
    label: 'Messenger',
    href: 'https://www.messenger.com',
    description: 'Messaging',
    icon: PiHeart, // Facebook branding
    //color: '#1877F2',
  },
  {
    label: 'Slack',
    href: 'https://slack.com',
    description: 'Messaging',
    icon: PiCodeSimple, // work / team collaboration
    //color: '#4a154b',
  },
  {
    label: 'Telegram',
    href: 'https://web.telegram.org/',
    description: 'Messaging',
    icon: PiAirplane, // paper plane icon
    //color: '#0088cc',
  },
];
