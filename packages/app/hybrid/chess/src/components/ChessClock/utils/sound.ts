let ctx: AudioContext | null = null;

export const beep = (freq = 440, ms = 120, volume = 0.04): void => {
  try {
    const AC: typeof AudioContext | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = ctx ?? new AC();
    if (ctx.state === 'suspended') ctx.resume();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ms / 1000);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + ms / 1000);
  } catch {
    // audio unavailable (jsdom / browsers without WebAudio)
  }
};

export const playFlagFall = (): void => beep(180, 500, 0.06);
export const playLowTime = (): void => beep(880, 90, 0.05);
export const playTick = (): void => beep(1000, 24, 0.02);
