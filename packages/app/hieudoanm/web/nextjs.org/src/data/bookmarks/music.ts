import { PiMusicNote, PiPlay } from 'react-icons/pi';
import { ItemCardProps } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';

export const music: ItemCardProps[] = [
  {
    label: 'Spotify',
    href: 'https://open.spotify.com',
    description: 'Music',
    icon: PiMusicNote,
    //color: '#1DB954',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    description: 'Videos',
    icon: PiPlay,
    //color: '#ff0000',
  },
];
