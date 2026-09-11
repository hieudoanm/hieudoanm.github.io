import { createLogger } from '../utils/log';

export const SOUND_AUDIBLE_ACTION = 'SOUND_AUDIBLE';

const SOUND_SWEEP_MS = 1000;

const log = createLogger('Audio:');

const isProducingAudio = (): boolean => {
  const elements = document.querySelectorAll('video,audio');
  log.debug('sweep', `media elements: ${elements.length}`);
  for (const element of elements) {
    const media = element as HTMLMediaElement;
    log.debug('element', {
      paused: media.paused,
      ended: media.ended,
      muted: media.muted,
      volume: media.volume,
      src: media.currentSrc || media.src,
    });
    if (!media.paused && !media.ended && !media.muted && media.volume > 0) {
      return true;
    }
  }
  return false;
};

let lastReported = false;

const report = (playing: boolean): void => {
  if (playing === lastReported) return;
  lastReported = playing;
  log.info(`state change → playing=${playing}`);
  try {
    chrome.runtime.sendMessage(
      { action: SOUND_AUDIBLE_ACTION, playing },
      () => {
        if (chrome.runtime.lastError) {
          log.debug('no receiver:', chrome.runtime.lastError.message);
        }
      }
    );
  } catch (err) {
    log.debug('sendMessage threw:', err);
  }
};

const sweep = (): void => {
  const playing = isProducingAudio();
  log.debug('sweep →', playing);
  report(playing);
};

export const registerAudioDetection = (): void => {
  if (window.top !== window) {
    log.debug('skipping (not top frame)');
    return;
  }
  log.info(`starting media sweep every ${SOUND_SWEEP_MS}ms`);
  sweep();
  window.setInterval(sweep, SOUND_SWEEP_MS);
};
