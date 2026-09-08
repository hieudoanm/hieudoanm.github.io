import { useRef, useState } from 'react';

import { NODE_ENV } from './constants';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ripple, setRipple] = useState(false);

  const playTone = (id: string) => {
    try {
      const note =
        NODE_ENV === 'development'
          ? `/audio/3/${id}.mp3`
          : `/hieudoanm/audio/3/${id}.mp3`;
      const audio = new Audio(note);
      audioRef.current = audio;
      audio.play();
      setRipple(true);
      setTimeout(() => setRipple(false), 600);
    } catch (error) {
      console.error(error);
    }
  };

  return { audioRef, ripple, playTone };
};
