import { MegForwardSimulator } from '@/games/stem/neuroscience/meg';

export default function MegInteractivePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-2xl font-bold">
          MEG / EEG Forward Model
        </h1>
        <p className="text-base-content/60 text-sm">
          One cortical dipole, two sensor modalities. Rotate it, bury it, or
          move the array to see what the skull does to the scalp potential.
        </p>
      </div>
      <MegForwardSimulator />
    </div>
  );
}
